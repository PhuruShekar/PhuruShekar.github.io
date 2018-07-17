import React, { Component } from 'react';
import {
    Link
  }   from 'react-router-dom' ;

class Footer extends Component {
  render() {
    return (
        <footer>
        <nav>
        <ul>
            <li>
            <Link to="/">Home</Link>

            </li>
            <li>
                <Link to="/">Accomplishments</Link>
            </li>
            <li>
                <Link to="/Projects">Projects</Link>
            </li>
            <li>
                <Link to="/">Interests</Link>
            </li>
            <li>
                <Link to="/Bookshelf">Bookshelf</Link>
            </li>
        </ul>

          <p>
            (c) 2018 Phuru Shekar
          </p>


    </nav>
        </footer>
    );
  }
}

export default Footer;
