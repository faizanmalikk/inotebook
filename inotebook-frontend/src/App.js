import NavBar from "./components/NavBar";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NotesState from "./Context/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import React,{useState} from "react";
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (type,msg)=>{
    setAlert({
    type: type,
    msg : msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
    }
  return (
    <>
  
    <NotesState>
    <BrowserRouter>
    
    <NavBar/>
    <Alert alert={alert}  />
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}  />
      <Route exact path="/about" element={<About/>}  />
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}  />
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}  />
    </Routes>
    </div>
    </BrowserRouter>
    </NotesState> 
    </>
  );
}

export default App;
