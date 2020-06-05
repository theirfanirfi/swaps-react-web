import React, { Redirect } from 'react';
import Home from './Components/Home/Home.js';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Profile from './Components/Profile/Profile.js';
import EditProfile from './Components/EditProfile/EditProfile.js'
import UserProfile from './Components/UserProfile/UserProfile.js';
import BrowseTab from './Components/Browse/BrowseTab';
import SwapsTab from './Components/Swaps/SwapsTab';
import NotificationsTab from './Components/Notifications/NotificationsTab';
import SwapReqsTab from './Components/SwapRequests/SwapReqsTab';
import Status from './Components/Status/Status.js';
import Chat from './Components/Chat/Chat.js';
import Search from './Components/Search/Search.js';
import SignUpComponent from './Components/LoginRegister/SignUpComponent.js';
import LoginComponent from './Components/LoginRegister/LoginComponent.js';

export default class App extends React.Component {
  // var primaryColor = '#5202FF';

  componentDidMount() {

  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/profile/" ><Profile /></Route>

            <Route exact path="/profile/:id" component={UserProfile} />
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

            <Route path="/editprofile">
              <EditProfile />
            </Route>

            <Route path="/signup">
              <SignUpComponent />
            </Route>

            <Route path="/login">
              <LoginComponent />
            </Route>


            <Route path="/status/:id" component={Status} />
            <Route path="/chat/:id" ><Chat /> </Route>
            <Route path="/search/:s" ><Search /></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
