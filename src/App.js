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

        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
