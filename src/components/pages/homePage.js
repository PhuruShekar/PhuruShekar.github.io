import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';

class HomePage extends Component {
  render() {
    return (
        <div className="container-fluid">
            <main>

                <h1>
                    Hey! Welcome to the site!
                </h1>

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