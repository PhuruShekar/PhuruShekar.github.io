import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
       
        <div className="logo">
        LOGO 
        </div>

        <nav>
            <ul>
                <li className="first">
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Activities</a>
                </li>
                <li>
                    <a href="#">Projects</a>
                </li>
                <li>
                    <a href="#">Interests</a>
                </li>
                <li>
                    <a href="#">Books</a>
                </li>
                <li className="last">
                    <a href="#">More</a>
                </li>
            </ul>

        </nav>

      </header>
    );
  }
}

export default Header;
