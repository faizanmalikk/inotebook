import {Link,useLocation} from 'react-router-dom'
import {Navbar,Nav,Container,Button} from "react-bootstrap"
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
function About() {
  let location = useLocation()
  return (
    <div>
      this is about
    </div>
//     <div style={{width : "100% !important" }}>
// <Navbar expand="lg" bg='dark' variant='dark'>
//   <Container  >
//  <Link to={'/'}>   <Navbar.Brand >iNotebook</Navbar.Brand> </Link>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="me-auto">
//       <Link to={'/'} className={`${location.pathname==='/'?'active' : ''}`}> <Nav.Link >Home</Nav.Link> </Link> 
//       <Link to={'/about'} className={`${location.pathname==='/about'?'active' : ''}`}> <Nav.Link href="#link">About</Nav.Link>  </Link> 
    
//       </Nav>
//     </Navbar.Collapse>
//     <Navbar.Collapse className="justify-content-end">
//     <Link to="/login">  <Button size='sm' className='mx-1' type='submit'>Login</Button> </Link> 
//    <Link to="/signup">  <Button size='sm' className='mx-1' type='submit'>signup</Button> </Link> 

//     </Navbar.Collapse>
//   </Container>
// </Navbar>

  // </div>
  )
}

export default About