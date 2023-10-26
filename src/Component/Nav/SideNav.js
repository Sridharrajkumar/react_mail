import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'

const SideNav = () => {
  return (
      <div>
        
          <Navbar style={{backgroundColor:'lightgray'}}>
              <Nav className='mx-auto' style={{display:'flex', gap:'20px'}}>
                  <Button as={NavLink} to='/Compose' className='btn btn-primary' >Compose</Button>
                  <Nav.Link as={NavLink} to='/inbox'><b><span>Inbox</span>-<span>0</span></b></Nav.Link>
                  <Nav.Link as={NavLink} to='/send'><b>Send</b></Nav.Link>
              </Nav>
          </Navbar> 
        
    </div>
  )
}

export default SideNav

