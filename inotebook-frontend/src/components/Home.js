
import AddNote from './AddNote';
import Notes from './Notes';
function Home(props) {


  return (
    <> 
    <AddNote showAlert={props.showAlert}/>
 
  <Notes showAlert={props.showAlert}/>
    
    </>
  )
}

export default Home;