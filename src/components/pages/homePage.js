import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import me from "../../Assets/img/me.jpg";
import doc from "../../Assets/doc/Phuru_Shekar_Resume.pdf";

import { HashRouter as Router, Route, Link as Linky } from "react-router-dom";

//import { Document, Page } from 'react-pdf'
import { HashLink as Link } from "react-router-hash-link";

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="overlay">
            <main className="container-fluid">
              <img src={me} alt="profile pic" className="me fade-in two" />

              <h1 className="intro fade-in">
                Welcome! <br />
                <br />
                I'm Phurushotham (Phuru) Shekar <br /> <br />
              </h1>

              <p>Come take a look at what I'm up to!</p>
            </main>
          </div>
        </div>

        <div className="whoami container-fluid">
            <div className="container">
          <h1  className="text-center">About Me</h1>
          <Grid>
            <Row>
              <Col md={6}>
                <h2  className="text-center">Education</h2>
                <h3>Rutgers University - New Brunswick</h3>
                <p>Class of 2020</p>
                <p><strong>Major:</strong> Electrical and Computer Engineering (Computer Concentration)</p>
                <p><strong>Minor:</strong>Computer Science</p>
              </Col>
              <Col md={6}>
                  <h2  className="text-center">Experience</h2>
                  <h3>Web Developer Intern</h3>
                  <h4>Rutgers University Student Affairs Marketing &amp; Communications Division</h4>
                  <p><Link to="/Experience`">Click here to read more about it!</Link></p>
                </Col>
            </Row>
            <h2 className="text-center">Activities</h2>
            <Row>
                <Col md={6}>
                    <h3>TEDxRutgers</h3>
                    <h4>President</h4>
                </Col>
                <Col md={6}>
                    <h3>Undergraduate Student Alliance of Computer Scientists (USACS)</h3>
                    <h4>HackRU Organizer | Mentor</h4>
                </Col>
            </Row>
          </Grid>
          <p className="text-center">
            While you're here, feel free to take a look at my{" "}
            <a href={doc} window>
              Résumé
            </a>
            .{" "}
          </p>
          </div>
        </div>

        <div className="about">
          <div className="overlay">
           <h1>Technical Skills</h1>
           <Grid>
               <Row>
                   <Col md={6}>
                   <h2>Languages</h2>
                   <ul>
                       <li>Java</li>
                       <li>JavaScript</li>
                       <li>React.js</li>
                       <li>React Native</li>
                       <li>C</li>
                       <li>MATLAB</li>  
                   </ul>
                   </Col>
                   <Col md={6}>
                       <h2>Tools</h2>
                       <ul>
                           <li>Git</li>
                           <li>Node.js</li>
                           <li>Unix Terminal</li>
                           <li>MongoDB</li>
                           <li>Drupal</li>
                           <li>Wordpress</li>
                           <li>Bootstrap</li>
                           <li>Adobe XD</li>
                           <li>Photoshop</li>
                           <li>AfterEffects</li>
                       </ul>
                   </Col>
               </Row>
           </Grid>
          </div>
        </div>
      </div>
    );
  }
}

//stuff
//<p><a href="https://www.facebook.com/IminPeru"> Facebook </a></p>
//<p><a href="hhttps://www.instagram.com/iminperu/"> Instagram </a> </p>
//<p><a href="https://github.com/phurushekar"> Github </a></p>
//<p><a href="https://devpost.com/1minPeru"> DevPost </a></p>
//<p><a href={doc} window>Résumé</a></p>

export default HomePage;
