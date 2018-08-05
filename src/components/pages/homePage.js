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

        <div className="main">

            <div className="overlay">

                <main className="container-fluid">

                    <img src={me} className="me fade-in two" />

                    <h1 className="intro fade-in">
                        Welcome! <br/><br/>
                        I'm Phurushotham Shekar <br/> <br/>
                        But I also go by Phuru 
                    </h1>

                </main>

            </div> 

        </div>


        <div className="whoami">
            <h1>
                Who am I?
            </h1>

            <p>
                I am an Electrical and Computer Engineering major (Computer Concentration) minoring in Computer Science<br/>

                 Rutgers University Class of 2020
            </p>

            <p>
                <strong>Activities</strong> <br/>
                Vice President and Director of Technology for <a href="http://tedxrutgers.com/">TEDxRutgers</a> <br/>
                Member of the Rutgers <a href="http://usacs.rutgers.edu">Undergraduate Student Alliance of Computer Scientists (USACS) </a> <br/>
                Find out more about my activities and awards  <Link to="/Accomplishments">here!</Link>
            </p>

            <p>
                <strong>Some Projects I've worked on</strong> <br/>
                This <a href="https://phurushekar.github.io"> Website </a>  [ReactJS, HTML, CSS] <br/>
                <a href="https://tedxrutgers.github.io/2018conf"> TEDxRutgers2018 Site (Will be live in November 2018)</a> [HTML, CSS] <br/>
                <a href="https://devpost.com/software/gradian-1qp0ac"> Gradian </a> [AdobeXD, HTML, CSS, ReactJS] <br/>
                You can find out more about my projects <Link to="/Accomplishments">here</Link> <br/>
                Projects can also be found on  <a href="https://github.com/phurushekar">Github</a>
            </p>

        </div>
    

        <div className="contact">
            <div className="overlay">

                <p>
                    Social Media Links: <br/>
                    FB, LinkedIn, Instagram, Github
                </p>

            </div>
        </div>

    </div>
    );
  }
}

export default HomePage;