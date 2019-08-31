import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';

class Experience extends Component {
    render() {
        return (
            <div className="container-fluid">
                <main>
                <h1>
                    404 Error Not Found
                </h1>

                <p>
                   We're just gonna keep waiting buddy
                </p>

                <p>
                This progress bar is gonna be stuck here until you go home.
                </p>
                <ProgressBar active bsStyle="warning" now={"99"} label={"99%"} />
                </main>
            </div>
        )
    }
}

export default Experience;
