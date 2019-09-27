import React, { Component } from 'react';
  import { Navbar, Nav, NavItem } from "react-bootstrap";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
  import doc from '../../Assets/doc/Phuru_Shekar_Resume.pdf';

  const email1="phuru";
  const email2="shotham";

class Footer extends Component {
  render() {
    return (
        <Navbar className="nav foot">
          <Navbar.Header>
           <Navbar.Brand>
             <a href="https://github.com/PhuruShekar/PhuruShekar.github.io"><Navbar.Link href="https://github.com/PhuruShekar/PhuruShekar.github.io"> <strong> &copy; </strong> 2019 Phurushotham (Phuru) Shekar</Navbar.Link></a>
           </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-foot" />
          </Navbar.Header>
          <Navbar.Collapse id="basic-navbar-foot">
            <Nav pullRight>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://github.com/phurushekar"
                className = "icon"
              >
                <a target="_blank" 
                rel="noopener noreferrer" 
                href="https://github.com/phurushekar"><FontAwesomeIcon icon={['fab', 'github']} alt="github" /></a>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://linkedin.com/in/phurushotham-shekar"
              >
                <a target="_blank" 
                rel="noopener noreferrer" 
                href="https://linkedin.com/in/phurushotham-shekar"><FontAwesomeIcon icon={['fab', 'linkedin-in']} alt="linkedin"/></a>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://facebook.com/IminPeru"
              >
                <a  target="_blank" 
                rel="noopener noreferrer" 
                href="https://facebook.com/IminPeru"><FontAwesomeIcon icon={['fab', 'facebook-f']} alt="facebook" /></a>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://instagram.com/iminperu"
              >
                <a target="_blank"
                rel="noopener noreferrer" 
                href="https://instagram.com/iminperu"><FontAwesomeIcon icon={['fab', 'instagram']} alt="instagram"/></a>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href="https://devpost.com/phurushekar"
              >
                <a   target="_blank" 
                rel="noopener noreferrer" 
                href="https://devpost.com/phurushekar"><FontAwesomeIcon icon={['fab', 'dochub']} alt="devpost"/></a>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href={`mailto:${email1}${email2}@gmail.com`}
              >
                <a   target="_blank" 
                rel="noopener noreferrer" 
                href={`mailto:${email1}${email2}@gmail.com`}><FontAwesomeIcon icon={faEnvelope} alt="email"/></a>
              </NavItem>
              <NavItem 
                target="_blank" 
                rel="noopener noreferrer" 
                href={doc} 
                window
              >
                <a target="_blank" 
                rel="noopener noreferrer" 
                href={doc} >Résumé</a>
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
