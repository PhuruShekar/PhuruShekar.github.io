import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';

class Bookshelf extends Component {
    render() {
        return (
            <div className="container-fluid">
                <main>
                <h1>
                    Bookshelf
                </h1>

                <p>
                    Books being read...
                </p>
                <ProgressBar active bsStyle="success" now={"14"} label={"14%"} />
                </main>
            </div>
        )
    }
}

export default Bookshelf;
