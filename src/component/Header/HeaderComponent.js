import React, { PureComponent } from "react";
import {
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from "../../style/icons/blog128.png";

export default class Header extends PureComponent {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                height="30"
                width="30"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse 
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="mr-auto">
                <Link to="/categories" className="nav-link"> Ziņu kategorijas </Link>
                <Link to="/sign-in" className="nav-link"> Ielagoties/Reģistrēties </Link>
                <Link to="/profile" className="nav-link"> Profils </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
