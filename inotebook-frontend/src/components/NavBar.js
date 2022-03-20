import React,{useEffect} from 'react'
import {Link,useLocation,Navigate, useNavigate} from 'react-router-dom'
import {Button,Navbar,Nav,Container} from 'react-bootstrap'
function NavBar() {
  let location = useLocation()
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
     navigate('/login')
  }
  return (
    <Navbar expand="lg" bg='dark' variant='dark'>
  <Container fluid>
 <Link to={'/'} style={{textDecoration:"none"}}>   <Navbar.Brand >iNotebook</Navbar.Brand> </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto" >
 <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active' : ''}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active' : ''}`} to="/about">About</Link>
        </li>
    
  
      </Nav>
    </Navbar.Collapse>
{ !localStorage.getItem('token') ?   <Navbar.Collapse className="justify-content-end">
    <Link to="/login">  <Button size='sm' className='mx-1' type='submit'>Login</Button> </Link> 
   <Link to="/signup">  <Button size='sm' className='mx-1' type='submit'>signup</Button> </Link> 
</Navbar.Collapse> : <button className='btn btn-primary btn-sm' onClick={handleLogout}>Logout</button>}
  </Container>
</Navbar>

  )
}

export default NavBar


{/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active' : ''}`}aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?'active' : ''}`} to="/about">About</Link>
        </li>
    
      
      </ul>
      <form className="d-flex">
   <Link to="/login">  <Button size='sm' className='mx-1' type='submit'>Login</Button> </Link> 
   <Link to="/signup">  <Button size='sm' className='mx-1' type='submit'>signup</Button> </Link> 

      </form>
    </div>
  </div>
</nav> */}