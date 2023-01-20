import React, { useContext, useState } from 'react'
import {Nav, Container, Button} from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import { delLocalStorageUser } from '../../Utils/localStorage/localStorageUser';
import './NavBarUser.scss';


export const NavBarUser = () => {
  const {user, setUser, isLogged, setIsLogged} = useContext(AppContext);
  console.log(user);
  console.log(isLogged);

  const navigate= useNavigate();

  const logOut = ()=>{
    delLocalStorageUser();
    setUser();
    setIsLogged(false);
    navigate('/login');
  }

  return (
   <>
   <Navbar className='p-0'>
        <Container fluid className='NavBarContainer'>
          <Nav>
            <Nav.Link as={Link} to='/'><img src='../images/logo-blanco.png'/></Nav.Link>
          </Nav>
         
          {isLogged && user?.user_type === 2 && 
          <div className='d-flex'>
          <Nav.Link as={Link} to='/user/portafolio'>Portafolio</Nav.Link>
          <Nav.Link as={Link} to='/user/resumen'>Resúmen</Nav.Link>
          <Nav.Link as={Link} to='/descubre'>Descubre</Nav.Link>
          <Nav.Link>Valora</Nav.Link>
          <Nav.Link as={Link} to='/user/perfil'>Perfíl</Nav.Link>
          </div>
          
          }
          
          {!isLogged ? (
              <div>
              <button 
                className='me-3' 
                variant="light" 
                onClick={()=> navigate('/login')}
                >
                Login</button>
              <button 
                className='me-3' 
                variant="light" 
                onClick={()=> navigate('/register')}
                >
                Register</button>
              </div>
            ) : (
              <div>
                <img 
                  className='avatar-img' 
                  // onClick={()=> navigate('/user')}
                  src={user?.img ? 
                  `/images/user/${user.user_img}` : 
                  '../images/avatar.png'}
                  />
                <Button 
                  className='me-3' 
                  variant="light" 
                  onClick={logOut}
                  >
                  Log Out</Button> 
              </div>
            )}

        </Container>
      </Navbar>
   </>
  )
}
