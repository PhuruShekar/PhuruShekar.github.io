import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';

class HomePage extends Component {
  render() {
    return (
        <div className="overlay">
            <main className="container-fluid">

                <h1>
                    Welcome!
                </h1>
                <img src={me} className="me" />

                <p>
                Don't rush me, I'm working on the site as fast as I can!
                </p>
    
                <ProgressBar active bsStyle="danger" now={"15"} label={"15%"} />

            </main>

        </div>
    );
  }
}

export default HomePage;