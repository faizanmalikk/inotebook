import NotesContext from "./notesContext";
import { useState } from "react";
const NotesState = (props)=>{
const initialNotes = []
  const [notes, setnotes] = useState(initialNotes)
  const host = 'http://localhost:5000'

//Fetch all notes

const fetchNotes = async ()=>{
//api call

const url = `${host}/api/notes/fetchallnotes`
const response = await fetch(url, {
  method: 'Get', 
 headers: {
    'Content-Type': 'application/json',
     "auth-token" : localStorage.getItem('token')
  },
body: JSON.stringify()
});
const json = await response.json();
setnotes(json)
}

//Add a note

const addNote = async (title,description,tag)=>{
//api call

const url = `${host}/api/notes/addnotes`
const response = await fetch(url, {
  method: 'Post', 
 headers: {
    'Content-Type': 'application/json',
     "auth-token" : localStorage.getItem('token')
  },
body: JSON.stringify({title,description,tag})
});
const note = await response.json();
setnotes(notes.concat(note))
}

//Del a note

const delNote = async (id)=>{
  //api call

  const url = `${host}/api/notes/deletenote/${id}`
const response = await fetch(url, {
  method: 'DELETE', 
 headers: {
    'Content-Type': 'application/json',
     "auth-token" : localStorage.getItem('token')
  }

});
const json = response.json();

  //logic to del a note
  const newNote = notes.filter((notes)=>{return notes._id!==id})
  setnotes(newNote)
  
}

//Edit a Note

const editNote = async (title,description,tag,id)=>{
  console.log("id=" + id )
  // api call
  
  let url = `${host}/api/notes/updatenote/${id}`
const response = await fetch(url, {
    method: 'PUT', 
   headers: {
      'Content-Type': 'application/json',
       "auth-token" : localStorage.getItem('token')
    },
  body: JSON.stringify({title,description,tag})
  });

  const json = await  response.json(); 
  console.log(json)
  let newNotes = JSON.parse(JSON.stringify(notes))
  // logic behind edit a note
  
  for (let index = 0; index < newNotes.length; index++) {
    let element = newNotes[index];
  if(element._id===id){
    newNotes[index].title = title;
    newNotes[index].description = description;
    newNotes[index].tag = tag;
    break;
  }
    
  }
 setnotes(newNotes)
}

  return(
       <NotesContext.Provider value={{notes , addNote , delNote , fetchNotes , editNote}}>
           {props.children}
       </NotesContext.Provider>
    )
}
export default NotesState;