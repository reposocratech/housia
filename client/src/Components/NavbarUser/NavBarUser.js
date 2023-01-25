import React, { useContext } from 'react'
import {Nav, Navbar, Container, Button} from 'react-bootstrap'
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
            <Nav.Link as={Link} to='/'><img src='../images/logo-blanco.png' alt='logo_blanco'/></Nav.Link>
            <Nav.Link as={Link} to='/testField'>Campo de pruebas</Nav.Link>
           </Nav>
         
          {isLogged && user?.user_type === 2 && 
          <Nav className='d-flex'>
          <Nav.Link as={Link} to='/user/portafolio'>Portafolio</Nav.Link>
          <Nav.Link as={Link} to='/user/resumen'>Resúmen</Nav.Link>
          <Nav.Link as={Link} to='/descubre'>Descubre</Nav.Link>
          <Nav.Link>Valora</Nav.Link>
          <Nav.Link as={Link} to='/user/perfil'>Perfíl</Nav.Link>
          <Nav.Link as={Link} to='/addProperty'>Añadir propiedad</Nav.Link>
          <Nav.Link as={Link} to='/addEconomicFeatures'>Añadir Caracteristicas Economicas</Nav.Link>
          </Nav>
          
          
          }

          {isLogged && user?.user_type === 1 &&
          <Nav className='d-flex'>
          <Nav.Link as={Link} to='/admin'>Home</Nav.Link>
          <Nav.Link as={Link} to='/addProperty'>Añadir propiedad</Nav.Link>
          <Nav.Link as={Link} to='/addEconomicFeatures'>Añadir Caracteristicas Economicas</Nav.Link>
          <Nav.Link as={Link} to='/admin/customFeaturesElem'>Custom features</Nav.Link>
          </Nav>
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
                  onClick={()=> navigate('/user/perfil')}
                  src={`/images/user/${user?.user_img}`}
                  alt={user?.user_name}
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
