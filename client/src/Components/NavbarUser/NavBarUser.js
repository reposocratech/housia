import React, { useContext } from 'react'
import {Nav, Navbar, Container, Button, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import { delLocalStorageUser } from '../../Utils/localStorage/localStorageUser';
import './NavBarUser.scss';


export const NavBarUser = () => {
  const {user, setUser, isLogged, setIsLogged} = useContext(AppContext);

  const navigate= useNavigate();

  const logOut = ()=>{
    delLocalStorageUser();
    setUser();
    setIsLogged(false);
    navigate('/login');
  }

  return (
   <>
   <Navbar className='NavBarContainer' expand="lg">
      <Container>
      <Navbar.Brand as={Link} to='/'><img src='../images/logo-blanco.png' alt='logo_blanco'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='d-flex justify-content-evenly'>
          <Nav.Link as={Link} to='/testField'>Campo de pruebas</Nav.Link>


          {isLogged && user?.user_type === 2 && 
            <Nav className='d-flex'>
            <Nav.Link as={Link} to='/user/portafolio'>Portafolio</Nav.Link>
            <Nav.Link as={Link} to='/user/summaryInversion'>Resúmen</Nav.Link>
            <Nav.Link as={Link} to='/discover'>Descubre</Nav.Link>
            <Nav.Link as={Link} to='/addProperty'>Añadir propiedad</Nav.Link>
            </Nav>
          }
            
          {isLogged && user?.user_type === 1 &&
            <Nav className='d-flex'>
            <Nav.Link as={Link} to='/admin'>Home</Nav.Link>
            <Nav.Link as={Link} to='/addProperty'>Añadir propiedad</Nav.Link>
            <Nav.Link as={Link} to='/admin/customFeaturesElem'>Custom features</Nav.Link>
            </Nav>
          }
          </Nav>

          <div className='d-flex align-items-center'>
          <img 
                  className='avatar-img' 
                  onClick={()=> navigate('/user/perfil')}
                  src={`/images/user/${user?.user_img}`}
                  alt={user?.user_name}
                  />
            <NavDropdown className='dropdown-perfil' id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to='/user/perfil'>Perfíl</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/user/editUser'>
                  Editar perfil
                  </NavDropdown.Item>  
                  <NavDropdown.Item as={Link} to="/user/favourites">
                  Favoritos
                  </NavDropdown.Item>  
                  <NavDropdown.Item href="#action/3.4" onClick={logOut}>
                  Cerrar sesión
                  </NavDropdown.Item>  
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}
