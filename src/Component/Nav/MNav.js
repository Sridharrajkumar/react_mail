import React from 'react'

import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const MNav = () => {
  return (
    <>
    <Navbar expand='sm' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
            <h3>Mail Box</h3>
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink}  to='/'><h5>Home</h5></Nav.Link>
          <Nav.Link as={NavLink} to='/'><h5>About</h5></Nav.Link>
          <Nav.Link as={NavLink} to='/'><h5>Contact</h5></Nav.Link>
        </Nav>
        <div className='d-flex gap-2'>
          <Button as={NavLink} to='/sign'>LogOut</Button>
        </div>
     </Container>
    </Navbar>
    </>
  )
}

export default MNav