import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';

class HomePage extends Component {
  render() {
    return (
        
        <div className="overlay">
        <img src={me} className="me" />

            <main className="container-fluid">

                <h1>
                    Welcome!
                </h1>
               
                <p> 
                    I'm Phurushotham
                </p>

                <p> 
                    but you can call me Phuru!
                </p>
    
                <ProgressBar active bsStyle="danger" now={"15"} label={"15%"} />

            </main>

        </div>
    );
  }
}

export default HomePage;