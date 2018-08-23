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
              <li> <a target="_blank" href="https://facebook.com"><i class="fa fa-3x fa-google-plus"></i></a></li>
              <li> <a target="_blank" href="your_url_here"><i class="fa fa-3x fa-facebook"></i></a></li>
              <li><a target="_blank" href="your_url_here"><i class="fa fa-3x fa-twitter"></i></a></li>
              <li></li>
              <li></li>
            </ul>

          </nav>

        </footer>
    );
  }
}

export default Footer;
