import React, { Component } from "react";
import { Grid, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import me from "../../Assets/img/me.jpg";
import doc from "../../Assets/doc/Phuru_Shekar_Resume.pdf";

const email1 = "phurus";
const email2 = "hotham";
class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="overlay">
            <main className="container-fluid">
              <img src={me} alt="profile pic" className="me fade-in two" />
              <ul className="social text-center">
                <li><a  target="_blank" 
                rel="noopener noreferrer" 
                href="https://github.com/phurushekar"><FontAwesomeIcon icon={['fab', 'github']} alt="github"/></a></li>
                <li><a   target="_blank" 
                rel="noopener noreferrer" 
                href="https://linkedin.com/in/phurushotham-shekar"><FontAwesomeIcon icon={['fab', 'linkedin-in']} alt="linkedin"/></a></li>
                <li><a
                 target="_blank" 
                 rel="noopener noreferrer" 
                 href="https://facebook.com/IminPeru"><FontAwesomeIcon icon={['fab', 'facebook-f']} alt="facebook" /></a></li>
                <li><a   target="_blank" 
                rel="noopener noreferrer" 
                href="https://instagram.com/iminperu"><FontAwesomeIcon icon={['fab', 'instagram']} alt="instagram" /></a></li>
                <li><a  target="_blank" 
                rel="noopener noreferrer" 
                href="https://devpost.com/phurushekar"><FontAwesomeIcon icon={['fab', 'dochub']} alt="devpost" /></a></li>
                 <li><a   target="_blank" 
                rel="noopener noreferrer" 
                href={`mailto:${email1}${email2}@gmail.com`}><FontAwesomeIcon icon={faEnvelope} alt="email" /></a></li>
              </ul>
              <h1 className="intro fade-in">
                Welcome! 
              </h1>
              <h1 className="intro fade-in">
                I'm Phurushotham (Phuru) Shekar 
              </h1>
              <p className="intro fade-in">Come take a look at what I'm up to!</p>
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
                <p><strong>Minor:</strong> Computer Science</p>
              </Col>
              <Col md={6}>
                  <h2 className="text-center">Experience</h2>
                  <h3>Web Developer Intern</h3>
                  <h4>May 2019 - Present</h4>
                  <h4>Rutgers University Student Affairs Marketing &amp; Communications Division</h4>
                </Col>
            </Row>
            <h2 className="text-center">Activities</h2>
            <Row>
                <Col md={6}>
                    <h3>TEDxRutgers</h3>
                    <h4>President (Spring 2019 - Present)</h4>
                    <h4>Vice-President (Spring 2018 - Spring 2019)</h4>
                    <h4>Technology Director ( Spring 2017- Spring 2019)</h4>
                </Col>
                <Col md={6}>
                    <h3>Undergraduate Student Alliance of Computer Scientists (USACS)</h3>
                    <h4>HackRU Volunteer and Hacker Experience Organizer ( Fall 2018 - Present)</h4>
                    <h4>Mentor ( Spring 2019 - Present)</h4>
                </Col>
            </Row>
          </Grid>
          <p className="text-center message">
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
           <h1 >Technical Skills</h1>
           <Grid>
               <Row>
                   <Col md={6} className="text-center list">
                   <h2>Languages</h2>
                   <ul>
                       <li>Java</li>
                       <li>JavaScript</li>
                       <li>HTML/CSS</li>
                       <li>C</li>
                       <li>Python</li>
                       <li>MATLAB</li>  
                   </ul>
                   </Col>
                   <Col md={6} className="text-center list">
                       <h2>Tools</h2>
                       <ul>
                           <li>Git</li>
                           <li>Node.js</li>
                           <li>Unix Terminal</li>
                           <li>React.js</li>
                           <li>React Native</li>
                           <li>Drupal</li>
                           <li>Wordpress</li>
                           <li>Bootstrap</li>
                           <li>MongoDB</li>
                           <li>Adobe XD</li>
                           <li>Photoshop</li>
                       </ul>
                   </Col>
               </Row>
               <Row className="text-center list">
               <h2>Coursework</h2>
                   <ul>
                       <li>Data Structures</li>
                       <li>Linear Algebra</li>
                       <li>Software Engineering</li>
                       <li>Systems Programming</li>
                       <li>Computer Architecture</li>  
                       <li>Digital Logic Design</li>
                       <li>Linear Systems and Signals</li>

                   </ul>
                   <h3>Current</h3>
                   <ul>
                      <li>Algorithms</li>
                      <li>Machine Learning for Engineers</li>
                      <li>Information and Network Security</li>
                      <li>Digital System Design</li>
                   </ul>
               </Row>
           </Grid>
          </div>
        </div>
        <div id="Proj" className="container-fluid projects">
          <div className="container">
            <h1 className="text-center">Projects</h1>
              <Grid>
                <Row>
                  <Col md={6} className = "proj">
                    <h2 className="text-center"><a href="https://devpost.com/software/brewba" target="_blank" rel="noopener noreferrer">Brewba</a></h2>
                    <h3>BitCamp 2019</h3>
                    <p>Automated bubble tea machine with a conveyer belt system to dispense each part of the beverage into the cup.</p>
                    <p><strong>Tech Used:</strong> Arduino, IOT devices, Duct Tape</p>
                  </Col>
                  <Col md={6} className = "proj">
                    <h2 className="text-center"><a href="https://github.com/rutgerssoftwareengineering/Minerva" target="_blank" rel="noopener noreferrer">Minerva</a></h2>
                    <h3>Term Project – Software Engineering (ECE:452)</h3>
                    <p>Mobile and web system to increase Professor and Student communication by adding in-class quizzes, questions and feedback to the features offered in existing learning management systems.</p>
                    <p><strong>Tech Used:</strong> React Native, React.js, MongoDB</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className = "proj">
                    <h2 className="text-center"><a href="https://github.com/phurushekar/wearther" target="_blank" rel="noopener noreferrer">Wea(r)ther</a></h2>
                    <h3>Personal Project - Current</h3>
                    <p>Cross-platform mobile app that displays the weather and recommends clothing based on the weather.</p>
                    <p><strong>Tech Used:</strong> React Native, Redux</p>
                  </Col>
                  <Col md={6} className = "proj">
                    <h2 className="text-center"><a href="https://www.ibm.com/employment/vault/" target="_blank" rel="noopener noreferrer">IBM Vault Challenge 2018</a></h2>
                    <h3>Winner: 64 of 300+ (Top 2%)</h3>
                    <p>Solved 6 challenges that required parsing website code, cracking cyphers and editing given code in order to decode and identify the passwords for each level.</p>
                    <p><strong>Tech Used:</strong> React Native, React.js, MongoDB</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className = "proj">
                    <h2 className="text-center"><a href="https://devpost.com/software/gradian-1qp0ac" target="_blank" rel="noopener noreferrer">Gradian</a></h2>
                    <h3>Best Education Hack + Top 10 (of 135 teams) @ PennApps - January 2018</h3>
                    <p>Web and Mobile app to increase in-class student and professor interactions by allowing students to ask anonymous questions, give live feedback and answer in-class quizzes.</p>
                    <p><strong>Tech Used:</strong> React Native, React, AdobeXD</p>
                  </Col>
                  <Col md={6} className = "proj">
                    <h2 className="text-center"><a href="https://devpost.com/software/hackprinceton-njw1bq" target="_blank" rel="noopener noreferrer">LiveNote</a></h2>
                    <h3>Hack Princeton - Fall 2017</h3>
                    <p>Collaborative note taking application that merges notes from multiple students in real-time during lecture to allow students to transcribe all of the information given in lecture.</p>
                    <p><strong>Tech Used:</strong> JavaScript</p>
                  </Col>
                </Row>
              </Grid>
          </div>
        </div>
        <div className="overlay form">
          <h1 className="text-center">Contact Me</h1>
          <h3 className="text-center"> Fill out the form below or reach out through my socials to contact me!</h3>
        <form id="fs-frm" className="contact" name="contact-form" accept-charset="utf-8" action={`https://formspree.io/${email1}${email2}@gmail.com`} method="post">
          <fieldset id="fs-frm-inputs" className="flexfield" >
            <label for="full-name">Your Name</label>
            <input type="text" name="name" id="full-name" placeholder="First and Last" required="" />
            <label for="email-address">Email Address</label>
            <input type="email" name="_replyto" id="email-address" placeholder="email@domain.com" required=""/>
            <label for="message">Message</label>
            <textarea rows="5" name="message" id="message" placeholder="Enter your message here!" required=""></textarea>
            <input type="hidden" name="_subject" id="email-subject" value="Contact Form Submission" />
          </fieldset>
          <input className="submit" type="submit" value="Submit" />
        </form>
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
