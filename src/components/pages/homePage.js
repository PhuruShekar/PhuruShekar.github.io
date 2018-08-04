import React, { Component } from 'react';
import {ProgressBar} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';
import {
    HashRouter as Router,
    Route,
    Link as Linky
  }   from 'react-router-dom' ;

  import { HashLink as Link } from 'react-router-hash-link';

class HomePage extends Component {
  render() {
    return (
      
    <div>

        <div id="tf-home">

            <div className="overlay">

                <main className="container-fluid">

                    <img src={me} className="me fade-in two" />

                    <h1 className="intro fade-in">
                        Hey! I'm Phurushotham (Phuru) Shekar.
                    </h1>

                    <Link smooth to="tf-about">About Frag</Link>


                </main>

            </div> 

        </div>

        <div id="tf-about">

            <h1>
            About Me
            </h1>
            <p>
            Hello! Welcome to the About Section!
            </p>
        </div>


    </div>
    );
  }
}

export default HomePage;