import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
}   from 'react-router-dom' ;
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
