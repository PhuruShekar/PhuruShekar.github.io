import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import doc from "../../Assets/doc/Phuru_Shekar_Resume.pdf";
import logo from "../../Assets/img/logo.png";

class Header extends Component {
  render() {
    return (
      <Navbar className="nav"  fixedTop>
        <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><img src={logo} height="150%" width="auto" /></Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav pullRight>
            <NavItem eventKey={1}>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem 
              eventKey={2}  
              href="https://bookshelf.website/phurushekar"
              target="_blank"
              rel="noopener noreferrer"
            >
                <a>Bookshelf</a>
            </NavItem>
            <NavItem eventKey={3} href={doc} window target="_blank">
                <a>Résumé</a>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
