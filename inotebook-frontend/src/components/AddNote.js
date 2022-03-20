import React,{useContext,useState} from 'react'
import NotesContext from '../Context/notes/notesContext'

function AddNote(props) {
    const context = useContext(NotesContext);
    const {addNote } = context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const Add = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
        props.showAlert('success','New note added!')
    }
    const handleChange = (e)=>{
    
        setnote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className='conatiner my-5'>
    <h2>Add a note</h2>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title:</label>
    <input type="text" className="form-control" onChange={handleChange} value={note.title} id="title" required name='title'/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description:</label>
    <input type="text" className="form-control" onChange={handleChange} value={note.description} id="description"  required name='description'/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag:</label>
    <input type="text" className="form-control" onChange={handleChange} value={note.tag}  id="tag" name='tag'/>
  </div>

  <button type="submit" disabled={note.title.length<5 || note.description.length<5}  className="btn btn-primary" onClick={Add}>Add Note</button>
</form>
  </div>
  )
}

export default AddNote