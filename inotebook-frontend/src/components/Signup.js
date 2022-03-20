import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Form,Button} from 'react-bootstrap'

function Signup(props) {
  const [credentials, setcredentials] = useState({name:"",email : "",password: "",cpassword:""})
  const navigate = useNavigate();

  const handleclick = async (e)=>{
  e.preventDefault();
  // const [name,email,password] = credentials
  const response = await fetch('http://localhost:5000/api/auth/createuser', {
    method: 'Post', 
   headers: {
      'Content-Type': 'application/json',
   },
  body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  });
  const json = await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      navigate("/") 
        props.showAlert('success','Account created successfully')
    }else{
      props.showAlert('danger','Incorrect credentials')

    }
  }
  const handleChange = (e)=>{
    
    setcredentials({...credentials,[e.target.id]:e.target.value})
}
  return (
    <>
       <h2 className='mt-5'>Create an account to use iNotebook</h2>

       <Form onSubmit={handleclick} className='my-3'>
  <Form.Group className="mb-3"   >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" id="email" value={credentials.email} onChange={handleChange} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Form.Group className="mb-3"   >
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter your name" id="name" value={credentials.name} onChange={handleChange} />
 </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" id="password" required minLength={5} value={credentials.password} onChange={handleChange} />
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>New Password</Form.Label>
    <Form.Control type="password" placeholder="New Password" id="cpassword" required minLength={5}  value={credentials.cpassword} onChange={handleChange} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Signup
  </Button>
</Form>
    </>
  )
}

export default Signup