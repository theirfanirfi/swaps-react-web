import React from 'react';
import Home from './Components/Home/Home.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './Components/Profile/Profile.js';
import BrowseTab from './Components/Browse/BrowseTab';
import SwapsTab from './Components/Swaps/SwapsTab';
import NotificationsTab from './Components/Notifications/NotificationsTab';
import SwapReqsTab from './Components/SwapRequests/SwapReqsTab';
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
   <Route path="/browse">
      <BrowseTab />
    </Route> 

    <Route path="/swaps">
      <SwapsTab />
    </Route> 

    <Route path="/notifications">
      <NotificationsTab />
    </Route> 

    <Route path="/swaprequests">
      <SwapReqsTab />
    </Route> 
  </Switch>
  </div>
  </Router>
  );
}
}

