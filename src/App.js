import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
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
//import Projects from './components/pages/projects';
//import Experience from './components/pages/experience';
//import Interests from './components/pages/interests';

// includes
import'./Assets/scss/default.css';

library.add(fab, faPenFancy, faEdit)

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
       
        <Header />
          
          <Route exact path="/" component={HomePage} />
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
