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

        </nav>

      </header>
    );
  }
}

export default Header;
