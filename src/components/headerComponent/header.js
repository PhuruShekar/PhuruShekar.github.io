import React, { Component } from 'react';
import {
    Link
  }   from 'react-router-dom' ;


class Header extends Component {
  render() {
    return (
      <header>
       
        <div className="logo">
        LOGO 
        </div>

        <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>

                </li>
                <li>
                    <a href="#">Accomplishments</a>
                </li>
                <li>
                    <Link to="/Projects">Projects</Link>
                </li>
                <li>
                    <a href="#">Interests</a>
                </li>
                <li>
                    <a href="#">Books</a>
                </li>
            </ul>

        </nav>

      </header>
    );
  }
}

export default Header;
