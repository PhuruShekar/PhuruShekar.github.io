import React, { Component } from 'react';
import {
    Link
  }   from 'react-router-dom' ;
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import doc from '../../Assets/doc/ResumePS.pdf';

class Footer extends Component {
  render() {
    return (
        <footer>
          <p>
            <strong> &copy; </strong> 2018 Phurushotham (Phuru) Shekar
          </p>

          <nav className="wrapper">
            <ul >
              <li> <a target="_blank" rel="noopener noreferrer" href="https://github.com/phurushekar" >    <FontAwesomeIcon icon={['fab', 'github']} /></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/phurushotham-shekar">     <FontAwesomeIcon icon={['fab', 'linkedin-in']}/></a></li>
              <li> <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/iminperu">    <FontAwesomeIcon icon={['fab', 'facebook-f']} /></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/iminperu">    <FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://devpost.com/1minPeru">     <FontAwesomeIcon icon={['fab', 'dochub']}/></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href={doc} window>    <FontAwesomeIcon icon="edit" /></a></li>
            </ul>

          </nav>

        </footer>
    );
  }
}

export default Footer;
