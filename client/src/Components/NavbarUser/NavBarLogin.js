import React from 'react'
import {Nav, Navbar, Container} from 'react-bootstrap'
import './NavBarUser.scss';
import {Link, useNavigate} from 'react-router-dom'


export const NavBarLogin = () => {
    const navigate= useNavigate();

    return (
     <>
  
     <Navbar className='p-0'>
          <Container fluid className='NavBarContainerLogin'>
            <Nav>
              <Nav.Link as={Link} to='/'><img src='../images/logo-blanco.png' alt='logo_blanco'/></Nav.Link>
              <Nav.Link as={Link} to='/login'>LogIn</Nav.Link>
              <Nav.Link as={Link} to='/register'>Registro</Nav.Link>
             </Nav>
          </Container>
        </Navbar>
     </>
    )
}
