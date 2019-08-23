import React, { Component } from 'react';
//import {ProgressBar, Tab} from 'react-bootstrap/lib';
import me from '../../Assets/img/me.jpg';
import doc from '../../Assets/doc/Phuru_Shekar_Resume.pdf';

import {
    HashRouter as Router,
    Route,
    Link as Linky
  }   from 'react-router-dom' ;

  //import { Document, Page } from 'react-pdf'
  import { HashLink as Link } from 'react-router-hash-link';

class HomePage extends Component {
  render() {
    return (
      
    <div>

        <div className="main">

            <div className="overlay">

                <main className="container-fluid">

                    <img src={me} alt="profile pic" className="me fade-in two" />

                    <h1 className="intro fade-in">
                        Welcome! <br/><br/>
                        I'm Phurushotham (Phuru) Shekar <br/> <br/>
                    </h1>
                    
                    <p>Come take a look at what I'm up to!</p>
                </main>

            </div> 

        </div>


        <div className="whoami">
            <div className="overlay">
            <h1>
                About Me
            </h1>

            <p className="centText">
                I am an Electrical and Computer Engineering major (Computer Concentration) minoring in Computer Science<br/>

                 Rutgers University Class of 2020
            </p>

            

            <p className="centText">While you're here, feel free to take a look at my <a href={doc} window>Résumé</a>. </p>
            </div>  
        </div>
    

        <div className="about">
            <div className="overlay">
            <br/>
                <h1>
                    <strong className="color">So cool!</strong><br/><br/>  How can I learn more?
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