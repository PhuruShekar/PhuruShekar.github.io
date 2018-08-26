import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
}   from 'react-router-dom' ;

//fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPenFancy, faEdit } from '@fortawesome/free-solid-svg-icons'

//add icons to library
//library.add(fab, faPenFancy, faFilePdf)

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import HomePage from './components/pages/homePage';
import Projects from './components/pages/projects';
import Bookshelf from './components/pages/bookShelf';
import Accomplishments from './components/pages/accomplishments';
import Interests from './components/pages/interests';

// includes
import'./Assets/css/default.css';

library.add(fab, faPenFancy, faEdit)

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
       
        <Header />
          
          <Route exact path="/" component={HomePage} />
          <Route exact path="/Projects" component={Projects} />
          <Route exact path="/Bookshelf" component={Bookshelf} />
          <Route exact path="/Accomplishments" component={Accomplishments} />
          <Route exact path="/Interests" component={Interests} />
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
