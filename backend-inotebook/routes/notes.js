const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

//Route 1: Fetch all notes  get /api/notes/fetchallnotes .Login required
router.get('/fetchallnotes',fetchuser,async (req,res) =>{
  try {
    const notes = await Note.find({user : req.user.id})
    res.json(notes)
  } catch (error) {
    console.error(error)
    res.status(500).json({error:"Interval error occured"})
  }

})

//Route 2: Add notes  post /api/notes/addnotes .Login required
router.post('/addnotes',fetchuser,[
    body('title','Please enter a title minimum three characters').isLength({ min: 3 }),
    body('description','Please enter a description minimum five characters ').isLength({ min: 5 }),
    body('tag','Please enter a tag minimum five characters ').isLength({ min: 3 }),
],async (req,res) =>{
    const errors = validationResult(req);
    // If any feild is emptycharacters

     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
  try {
  const {title,description,tag} = req.body;
  const note = new Note({
      title,description,tag,user : req.user.id
  })
  const savednote = await note.save();

    res.json(savednote)
  } catch (error) {
    console.error(error)
    res.status(500).json({error:"Interval error occured"})
  }

})
//Route 3: update note  put /api/notes/updatenotes .Login required

router.put('/updatenote/:id',fetchuser,async (req,res) =>{
   const {title,description,tag} = req.body;
   try {
     
  
   //Add a new note

   let newNote = {}
   if(title) {newNote.title = title  }
   if(description) {newNote.description = description  }
   if(tag) {newNote.tag = tag  }
   //Find the note to be updated and deleted

    let note = await Note.findById(req.params.id);
    if(!note)
    {return res.status(404).send("Not found")}
    if(note.user.toString() !== req.user.id)
    {return res.status(401).send("Not allowed")}
      note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json(note)
    } catch (error) {
      res.status(500).json({error:error})

    }
})

//Route 4: delete note  DELETE /api/notes/deletenote .Login required

router.delete('/deletenote/:id',fetchuser,async (req,res) =>{
   try {
     
   
   //Find the note to be deleted and delete it

    let note = await Note.findById(req.params.id);
    if(!note)
    {return res.status(404).send("Not found")}
    //Allow deletion only if user own this note

    if(note.user.toString() !== req.user.id)
    {return res.status(401).send("Not found")}

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({Success : "Note has been deleted"}) }
      catch (error) {
        res.status(500).json({error:"Interval error occured"})

      }
})

module.exports = router