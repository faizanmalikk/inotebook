import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Form,Button} from 'react-bootstrap'
function Login(props) {
  const [credentials, setcredentials] = useState({email : "",password: ""})
  const navigate = useNavigate();

  const handleclick = async (e)=>{
  e.preventDefault();
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'Post', 
   headers: {
      'Content-Type': 'application/json',
   },
  body: JSON.stringify({email : credentials.email , password : credentials.password})
  });
  const json = await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      navigate("/")
      props.showAlert('success','Logged in successfully')
    }else{
      props.showAlert('danger','Incorrect credentials')
    }
  }
  const handleChange = (e)=>{
    
    setcredentials({...credentials,[e.target.id]:e.target.value})
}
  return (
   <>
   <h2 className='mt-5'>Login to use iNotebook</h2>
   <Form onSubmit={handleclick} className='my-3'>
  <Form.Group className="mb-3"   >
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" id="email" value={credentials.email} onChange={handleChange} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" id="password" value={credentials.password} onChange={handleChange} />
  </Form.Group>

  <Button variant="primary" type="submit">
    Login
  </Button>
</Form>
   </>
  )
}

export default Login