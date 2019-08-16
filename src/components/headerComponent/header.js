import React, { Component } from 'react';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap/lib';
import {
    Link
  }   from 'react-router-dom' ;
  import {
    BrowserView,
    MobileView,
  } from "react-device-detect";

class Header extends Component {
  render() {
    return (
      <header>

        <div className="logo">
        LOGO 
        </div>
        
        <BrowserView>
        <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>

                </li>
                <li>
                    <Link to="/Accomplishments">Activities</Link>
                </li>
                <li>
                    <Link to="/Projects">Projects</Link>
                </li>
                <li>
                    <Link to="/Interests">Interests</Link>
                </li>
                <li>
                    <a href="https://bookshelf.website/phurushekar" target="_blank">Bookshelf</a>
                </li>
            </ul>
        </nav>
        </BrowserView>

        <MobileView>

        <ButtonToolbar>
        <DropdownButton
          //bsStyle="#000000"
          title="Menu"
          noCaret
          id="dropdown-no-caret"
          className = "dropdown"
          pullRight
        >
          <MenuItem className="Menu"><Link to="/">Home</Link></MenuItem>
          <MenuItem className="Menu"><Link to="/Accomplishments">Accomplishments</Link></MenuItem>
          <MenuItem className="Menu"><Link to="/Projects">Projects</Link></MenuItem>
          <MenuItem className="Menu"><Link to="/Interests">Interests</Link></MenuItem>
          <MenuItem className="Menu"><Link to="/Bookshelf">Bookshelf</Link></MenuItem>
        </DropdownButton>
        </ButtonToolbar>

        </MobileView>


      </header>
    );
  }
}

export default Header;
