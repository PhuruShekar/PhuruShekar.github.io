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

                </main>

            </div> 

        </div>

        <div>

            <h1>
            Who am I?
            </h1>
            <p>
                I am an Electrical and Computer Engineering major (Computer Concentration) minoring in Computer Science at Rutgers University (Class of 2020)
            </p>

            <p>
            Extracurriculars: <br/>
            Vice President and Technology Director of TEDxRutgers (link)
            <br/>
            Member of Undergraduate Student Alliance of Computer Scientists (USACS)
            <br/>
            Find out more about my activities and awards here!
            </p>

            <p>
            Some Projects I've worked on: <br/>
            This Website [ReactJS] <br/>
            TEDxRutgers2018 Site (Will be live in November 2018) [HTML, CSS] <br/>
            Gradian [AdobeXD, HTML, CSS, ReactJS] <br/>
            You can find out more about my projects (here) <br/>
            Projects are also found on Github (here)
            </p>

            <p>
            </p>

        </div>


    </div>
    );
  }
}

export default HomePage;