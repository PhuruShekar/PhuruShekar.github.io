import React, { Component } from 'react';
import {ProgressBar, Tab} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';
import doc from '../../Assets/doc/Phurushotham Shekar Resume Aug.pdf';

import {
    HashRouter as Router,
    Route,
    Link as Linky
  }   from 'react-router-dom' ;

  import { Document, Page } from 'react-pdf'
  import { HashLink as Link } from 'react-router-hash-link';

  import {
    BrowserView,
    MobileView,
  } from "react-device-detect";

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
                        I'm Phurushotham (Phuru) Shekar <br/> <br/>
                    </h1>
                    
                    <p>Come take a look at what I'm up to!</p>
                </main>

            </div> 

        </div>


        <div className="whoami">
            <h1>
                About Me
            </h1>

            <p className="centText">
                I am an Electrical and Computer Engineering major (Computer Concentration) minoring in Computer Science<br/>

                 Rutgers University Class of 2020
            </p>

           <BrowserView>
            <div className="row">
            <p className = "column">
                <strong>Activities</strong> <br/>
               <ul>
               <li> Vice President and Director of Technology for <a href="http://tedxrutgers.com/">TEDxRutgers</a> </li>
                <li>Member of the Rutgers <a href="http://usacs.rutgers.edu">Undergraduate Student Alliance of Computer Scientists (USACS) </a></li>
                <li>Find out more about my activities and awards  <Link to="/Accomplishments">here!</Link></li>
                <li></li>
                </ul>
                </p>

            <p className="column">
                <strong>Some Projects I've worked on</strong> <br/>
                <ul>
                <li>This <a href="https://phurushekar.github.io"> Website </a>  [ReactJS, HTML, CSS] </li>
                <li><a href="https://tedxrutgers.github.io/2018conf"> TEDxRutgers2018 Site </a> (live Nov. 2018) [HTML, CSS] </li>
                <li><a href="https://devpost.com/software/gradian-1qp0ac"> Gradian </a> [AdobeXD, HTML, CSS, ReactJS] </li>
                <li>You can find out more about my projects <Link to="/Projects">here</Link></li>
                <li>Projects can also be found on  <a href="https://github.com/phurushekar">Github</a></li>
                <li></li>
                </ul>
            </p>
            </div>
            </BrowserView>

            <MobileView>
            <p className="centText">
            <strong className="color">Activities</strong> <br/>
            Vice President and Director of Technology for <a href="http://tedxrutgers.com/">TEDxRutgers</a> <br/>
            Member of the Rutgers <a href="http://usacs.rutgers.edu">Undergraduate Student Alliance of Computer Scientists (USACS) </a> <br/>
            Find out more about my activities and awards  <Link to="/Accomplishments">here!</Link>
        </p>

        <p className="centText">
            <strong>Some Projects I've worked on</strong> <br/>
            This <a href="https://phurushekar.github.io"> Website </a>  [ReactJS, HTML, CSS] <br/>
            <a href="https://tedxrutgers.github.io/2018conf"> TEDxRutgers2018 Site </a> (Will be live in November 2018) [HTML, CSS] <br/>
            <a href="https://devpost.com/software/gradian-1qp0ac"> Gradian </a> [AdobeXD, HTML, CSS, ReactJS] <br/>
            You can find out more about my projects <Link to="/Projects">here</Link> <br/>
            Projects can also be found on  <a href="https://github.com/phurushekar">Github</a>
        </p>
            </MobileView>

            <p className="centText">While you're here, feel free to take a look at my <a href={doc} window>Résumé</a>. </p>
        </div>
    

        <div className="about">
            <div className="overlay">

            <br/>
                <h1>
                    <strong className="color">So cool!</strong><br/> How can I learn more?
                </h1>
                
                <br/>
                <p>Now, with all of that boring résumé stuff out of the way, we can explore my interests.</p><br/>

                <p>Some of my interests include reading, making things and soccer. <br/><br/>

                When school isn't in session, I try to read at least one book each week. You can check out my <Link to="/Bookshelf"><u>bookshelf</u> </Link>
                to see what I've read and my thoughts them. In my bookshelf I also have a list of books that I'm hoping to read soon. <br/><br/>

                I also love to make food and small craft projects. Earlier this summer I made a (paper swan) out of 100+ little paper pieces.
                I enjoy making food also since the best part of cooking is ... eating afterwards. I often make stir-fry, pizza, or french omlettes at home (and empty the dish soon after too).<br/><br/>

                Every weekend I try to watch a few games of soccer. I got into soccer in high school when I played for my high school team during my freshman and sophomore years.
                My joy for the beautiful game hasn't diminished since then; I love waking up early in the weekends to watch the Premier League.
                </p>
                <br/><br/>
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