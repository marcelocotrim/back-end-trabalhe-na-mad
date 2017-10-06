import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import Routes from './../routes';

require('./../parse');
require('./../styles/app.scss');

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
