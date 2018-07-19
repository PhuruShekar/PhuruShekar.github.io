import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';

class Interests extends Component {
    render() {
        return (
            <div className="container-fluid">
                <main>
                <h1>
                    Interests
                </h1>

                <p>
                    This project is interesting, I promise. You just have to wait.
                </p>

                <p>
                    Creating interest
                </p>
                <ProgressBar active bsStyle="warning" now={"80"} label={"80%"} />
                </main>
            </div>
        )
    }
}

export default Interests;
