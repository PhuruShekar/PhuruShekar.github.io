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
                        Come take a look at what I'm up to!
                    </h1>

                </main>

            </div> 

        </div>


        <div className="whoami">
            <h1>
                About Me
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
                <a href="https://tedxrutgers.github.io/2018conf"> TEDxRutgers2018 Site </a> (Will be live in November 2018) [HTML, CSS] <br/>
                <a href="https://devpost.com/software/gradian-1qp0ac"> Gradian </a> [AdobeXD, HTML, CSS, ReactJS] <br/>
                You can find out more about my projects <Link to="/Projects">here</Link> <br/>
                Projects can also be found on  <a href="https://github.com/phurushekar">Github</a>
            </p>

        </div>
    

        <div className="contact">
            <div className="overlay">

                <h1 className="intro">
                    Who am I?
                </h1>
                
                <p>Now, with all of that boring résumé stuff out of the way, we can explore my interests.</p><br/><br/>

                <p>Some of my interests include reading, food and soccer. <br/><br/>

                When school isn't in session, I try to read at least one book each week. You can check out my <Link to="/Bookshelf"><u>bookshelf</u> </Link>
                to see what I've read and my thoughts them. In my bookshelf I also have a list of books that I'm hoping to read soon. <br/><br/>

                I also love to cook and make little craft projects. Earlier this summer I made a (paper swan) out of 100+ little paper pieces.
                The best part of cooking is ... eating afterwards. I often make stir-fry, pizza, and french omlettes at home (and empty the dish soon after too).<br/><br/>

                I also enjoy watching and playing soccer. I got into soccer in high school when I played for the high school team my freshman and sophomore years.
                My joy of watching soccer hasn't diminished since then; I love waking up in the weekend to watch a Premier League game and follow the champions league.
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