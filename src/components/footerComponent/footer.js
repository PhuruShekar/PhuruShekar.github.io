import React, { Component } from 'react';
import {
    Link
  }   from 'react-router-dom' ;
  import { Navbar, Nav, NavItem } from "react-bootstrap";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import doc from '../../Assets/doc/Phuru_Shekar_Resume.pdf';

class Footer extends Component {
  render() {
    return (
        <Navbar className="nav foot">
           <Navbar.Brand>
             <Navbar.Link href="https://github.com/PhuruShekar/PhuruShekar.github.io"> <strong> &copy; </strong> 2019 Phurushotham (Phuru) Shekar</Navbar.Link>
           </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-foot" />
          <Navbar.Collapse id="basic-navbar-foot">
            <Nav pullRight>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://github.com/phurushekar"
              >
                <FontAwesomeIcon icon={['fab', 'github']} />
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://linkedin.com/in/phurushotham-shekar"
              >
                <FontAwesomeIcon icon={['fab', 'linkedin-in']}/>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://facebook.com/iminperu"
              >
                <FontAwesomeIcon icon={['fab', 'facebook-f']} />
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://instagram.com/iminperu"
              >
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://devpost.com/1minPeru"
              >
                <FontAwesomeIcon icon={['fab', 'dochub']}/>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href={doc} 
                window
              >
                Résumé
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
       /*<footer>
          <p>
            <strong> &copy; </strong> 2019 Phurushotham (Phuru) Shekar
          </p>

          <nav className="wrapper">
            <ul >
              <li> <a target="_blank" rel="noopener noreferrer" href="https://github.com/phurushekar" >    <FontAwesomeIcon icon={['fab', 'github']} /></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/phurushotham-shekar">     <FontAwesomeIcon icon={['fab', 'linkedin-in']}/></a></li>
              <li> <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/iminperu">    <FontAwesomeIcon icon={['fab', 'facebook-f']} /></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/iminperu">    <FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://devpost.com/1minPeru">     <FontAwesomeIcon icon={['fab', 'dochub']}/></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href={doc} window>Résumé</a></li>
            </ul>

          </nav>

        </footer>*/
    );
  }
}

export default Footer;
