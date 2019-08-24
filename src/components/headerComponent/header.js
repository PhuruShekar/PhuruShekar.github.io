import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import doc from "../../Assets/doc/Phuru_Shekar_Resume.pdf";

class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="md" fixedTop>
        <Navbar.Brand>
          <Link to="/">Phuru</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav pullRight>
            <NavItem eventKey={1}>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/Experience">Experience</Link>
            </NavItem>
            <NavItem eventKey={3}>
              <Link to="/Projects">Projects</Link>
            </NavItem>
            <NavItem eventKey={4}>
              <a
                href="https://bookshelf.website/phurushekar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bookshelf
              </a>
            </NavItem>
            <NavItem eventKey={5}>
              <a target="_blank" rel="noopener noreferrer" href={doc} window>
                Résumé
              </a>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
