import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';

class Accomplishments extends Component {
    render() {
        return (
            <div className="container-fluid">
                <main>
                <h1>
                    Accomplishments
                </h1>

                <p>
                    Finishing this in time will be an accomplishment, right?
                </p>

                <p>
                Accomplishing as many things as possible...
                </p>
                <ProgressBar active bsStyle="success" now={"10"} label={"10%"} />
                </main>
            </div>
        )
    }
}

export default Accomplishments;
