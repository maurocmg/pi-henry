import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/DetailPage';
import FormPage from './components/FormPage/FormPage';


function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={HomePage} />
            <Route path="/detail/:gameId" component={DetailPage} />
            <Route path="/form" component={FormPage} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;
