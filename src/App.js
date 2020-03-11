import React from 'react';
import logo from './logo.svg';
import Home from './Components/Home/Home.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { render } from '@testing-library/react';
import Profile from './Components/Profile/Profile.js';
export default class App extends React.Component {
  // var primaryColor = '#5202FF';
render(){
  return (
  <Router>
    <div>
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/home">
      <Home />
    </Route>
   <Route path="/profile">
      <Profile />
    </Route>
   {/* <Route path="/dashboard">
      <Dashboard />
    </Route>  */}
  </Switch>
  </div>
  </Router>
  );
}
}

