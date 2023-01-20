import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import './NavBarUser.scss';

import React from 'react'

export const NavBarUser = () => {
  return (
   <>
   <Navbar bg="dark" variant="dark">
        <Container className='NavBarContainer'>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
            <Nav.Link as={Link} to='/testField'>Campo de pruebas</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
   </>
  )
}
