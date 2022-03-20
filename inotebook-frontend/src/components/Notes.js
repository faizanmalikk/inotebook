
import React,{useContext,useEffect,useRef,useState} from 'react'
import { Button,Modal } from 'react-bootstrap';
import NotesContext from '../Context/notes/notesContext'
import { useNavigate } from 'react-router-dom';


import Notesitems from './Notesitems';
function Notes(props) {
    const context = useContext(NotesContext);
    const {notes,fetchNotes,editNote } = context;
    const ref = useRef(null)
    const closeref = useRef(null)
   const closeRef = useRef(null)
   const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [note, setnote] = useState({etitle:"",edescription:"",etag:"",id:""})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const updateNote = (currentNote)=>{
  ref.current.click();
  setnote({etitle : currentNote.title, edescription : currentNote.description , etag :  currentNote.tag , id : currentNote._id})
}
const onclick = (e)=>{
  editNote(note.etitle,note.edescription,note.etag,note.id)
  closeref.current.click();
  props.showAlert('success','Updated note successfully')

}

  const handleChange = (e)=>{
    
    setnote({...note,[e.target.name]:e.target.value})
}
    useEffect(() => {
      if(localStorage.getItem('token')){

        fetchNotes();
      }else{
     navigate('/login')
      }
    }, [])
    
  return (
    < >
      <Button variant="primary d-none " ref={ref} onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit - Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='conatiner my-3'>
   
    <form >
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title:</label>
    <input type="text" className="form-control" value={note.etitle} onChange={handleChange}  id="etitle" name='etitle'/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description:</label>
    <input type="text" className="form-control" value={note.edescription} onChange={handleChange} id="edescription" name='edescription'/>
  </div>
  <div className="mb-3">
    <label htmlFor="Tag" className="form-label">Tag:</label>
    <input type="text" className="form-control" value={note.etag} onChange={handleChange} id="etag" name='etag'/>
  </div>

</form>
  </div>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={closeref} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={ onclick}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
  
       <div className="row my-3 " >
    <h2>Your Notes</h2>
  <div className='mx-2'>{notes.length===0 && "No notes to display!"} </div>  
    {notes.map((v)=>{
      return <Notesitems notes={v} key={v._id} updateNote={updateNote} showAlert={props.showAlert} />;
    })}
  </div>
  </>
  )
}

export default Notes