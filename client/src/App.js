import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
//import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
