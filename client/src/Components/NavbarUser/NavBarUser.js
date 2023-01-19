import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import { delLocalStorageUser } from '../../Utils/localStorage/localStorageUser';
import './NavBarUser.scss';


export const NavBarUser = () => {
  const {user, setUser, isLogged, setIsLogged} = useContext(AppContext);
  console.log(user);

  const navigate= useNavigate();

  const logOut = ()=>{
    delLocalStorageUser();
    setUser();
    setIsLogged(false);
    navigate('/login');
  }

  return (
   <>
   <Navbar bg="dark" variant="dark">
        <Container className='NavBarContainer'>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            
          </Nav>
          {user?.type !== 2 && <>
              <Nav.Link as={Link} to='/user/portafolio'>Portafolio</Nav.Link>
            </>} 

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
                  `/images/user/${user.img}` : 
                  '../images/avatarmujer.png'}
                  />
                <button 
                  className='me-3' 
                  variant='light' 
                  // onClick={()=> navigate('/user')}
                  >
                  {user?.name}</button> 
                <button 
                  className='me-3' 
                  variant="light" 
                  onClick={logOut}
                  >
                  Log Out</button> 
              </div>
            )}

        </Container>
      </Navbar>
   </>
  )
}
