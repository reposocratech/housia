import React, { useContext } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { delLocalStorageUser } from "../../Utils/localStorage/localStorageUser";
import "./NavBarUser.scss";

export const NavBarUser = () => {
  const { user, setUser, isLogged, setIsLogged } = useContext(AppContext);
  const navigate = useNavigate();

  const logOut = () => {
    delLocalStorageUser();
    setUser();
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar collapseOnSelect className="NavBarContainer" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/images/logo-blanco.png" alt="logo_blanco" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="collapse-navbar">
            <Nav>
              <Nav.Link as={Link} to="/discover" eventKey="3">
                Descubre
              </Nav.Link>

              {isLogged && user?.user_type === 2 && (
                <Nav className="d-flex">
                  <Nav.Link as={Link} to="/user/portafolio" eventKey="1">
                    Portafolio
                  </Nav.Link>
                  <Nav.Link as={Link} to="/user/summaryInversion" eventKey="2">
                    Resúmen
                  </Nav.Link>
                  <Nav.Link as={Link} to="/addProperty" eventKey="4">
                    Añadir propiedad
                  </Nav.Link>
                  <Nav.Link
                    className="link-perfil"
                    as={Link}
                    to="/user/perfil"
                    eventKey="5"
                  >Perfíl
                  </Nav.Link>
                  
                </Nav>
              )}

              {isLogged && user?.user_type === 1 && (
                <Nav className="d-flex">
                  <Nav.Link as={Link} to="/addProperty" eventKey="8">
                    Añadir propiedad
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/allproperties" eventKey="6">
                    Todas Propiedades
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/admin/customFeaturesElem"
                    eventKey="7"
                  >
                    {" "}
                    Editar Características
                  </Nav.Link>
                </Nav>
              )}
            </Nav>

            <div className="dropdown-perfil">
              <NavDropdown id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user/perfil">
                  Perfíl
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user/editUser">
                  Editar perfil
                </NavDropdown.Item>

                {isLogged && user?.user_type === 2 && (
                  <NavDropdown.Item as={Link} to="/user/favourites">
                    Favoritos
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={logOut}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>

              <img
                className="avatar-img"
                onClick={() => navigate("/user/perfil")}
                src={`/images/user/${user?.user_img}`}
                alt={user?.user_name}
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
