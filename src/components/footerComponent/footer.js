import React, { Component } from 'react';
import {
    Link
  }   from 'react-router-dom' ;

class Footer extends Component {
  render() {
    return (
        <footer>
          <p>
            <strong> &copy; </strong> 2018 Phurushotham (Phuru) Shekar
          </p>

          <nav className="wrapper">
            <ul >
              <li> <a target="_blank" href="https://github.com/phurushekar"><i class="fa fa-3x fa-github"></i></a></li>
              <li> <a target="_blank" href="https://facebook.com/iminperu"><i class="fa fa-3x fa-facebook"></i></a></li>
              <li><a target="_blank" href="https://instagram.com/iminperu"><i class="fa fa-3x fa-instagram"></i></a></li>
              <li></li>
              <li></li>
            </ul>

          </nav>

        </footer>
    );
  }
}

export default Footer;
