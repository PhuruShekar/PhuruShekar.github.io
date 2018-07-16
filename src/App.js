import React, { Component } from 'react';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';

// includes
import'./Assets/css/default.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       
        <Header />

        <Footer />
      </div>
    );
  }
}

export default App;
