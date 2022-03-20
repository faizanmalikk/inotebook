import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import React,{useContext} from 'react'
import NotesContext from '../Context/notes/notesContext'
function Notesitems(props) {
  const context = useContext(NotesContext);
  const {delNote } = context;
   const {notes,updateNote,showAlert} = props;
  return (
      <div className='col-md-3'>   
           <div className="card  my-2" >
    <div className="card-body">
      <div className='d-flex  justify-content-between'> 
      <div style={{width : "71%"}}>  <h5 className="card-title">{notes.title}</h5> </div> 
         <div style={{width : "29%"}}>
      <FontAwesomeIcon style={{cursor : "pointer"}} className='mx-1' onClick={()=>{updateNote(notes)}} icon={faPenToSquare} />
      <FontAwesomeIcon style={{cursor : "pointer"}} className='mx-1' onClick={()=>{delNote(notes._id);showAlert('success','Note deleted successfully!')}} icon={faTrashCan} /> </div>
      </div>
      <p className="card-text">{notes.description} </p>
    </div>
  </div> </div>

  )
}

export default Notesitems