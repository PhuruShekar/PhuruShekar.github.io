import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';

class Projects extends Component {
    render() {
        return (
            <div className="container-fluid">
                <main>
                <h1>
                    Projects
                </h1>

                <p>
                    This project is currently being built...
                </p>

                <p>
                    Building projects
                </p>
                <ProgressBar active bsStyle="success" now={"20"} label={"20%"} />
                </main>
            </div>
        )
    }
}

export default Projects;
