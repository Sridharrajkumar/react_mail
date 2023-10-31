import React from 'react'

import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthActions } from '../../Store/AuthReducer';
import { MailActions } from '../../Store/Mailreducer';

const MNav = () => {

  const loggedIn = useSelector(state => state.Auth.isLogged);
  const dispatch = useDispatch();
  

  const LogOutHandler = () => {
    dispatch(AuthActions.logOut());
    dispatch(MailActions.clearMail());
  }


  return (
    <>
    <Navbar expand='sm' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
            <h3>Mail Box</h3>
        </Navbar.Brand>
        <Nav>
          {loggedIn && <Nav.Link as={NavLink}  to='/'><h5>Home</h5></Nav.Link>}
          {loggedIn && <Nav.Link as={NavLink} to='/'><h5>About</h5></Nav.Link>}
          {loggedIn && <Nav.Link as={NavLink} to='/'><h5>Contact</h5></Nav.Link>}
        </Nav>
        <div className='d-flex gap-2'>
          {loggedIn ? <Button onClick={LogOutHandler}>LogOut</Button> : <Button as={NavLink} to='/sign'>LogIn</Button>}
        </div>
     </Container>
    </Navbar>
    </>
  )
}

export default MNav