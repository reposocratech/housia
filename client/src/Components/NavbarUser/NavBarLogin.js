import React, { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./NavBarUser.scss";
import { Link } from "react-router-dom";

export const NavBarLogin = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null());
  };

  return (
    <>
      <Navbar className="p-0">
        <Container
          fluid
          className={
            isScrolled
              ? "NavBarContainerLogin scrolled p-0"
              : "NavBarContainerLogin p-o"
          }
        >
          <Nav>
            <Nav.Link as={Link} to="/">
              <img src="../images/logo-blanco.png" alt="logo_blanco" />
            </Nav.Link>
            <Nav.Link as={Link} to="/discover">
              Descubre
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              LogIn
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Registro
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
