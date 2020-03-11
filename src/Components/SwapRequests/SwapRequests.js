import React from "react";
// import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import HomeIcon from '@material-ui/icons/Home';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

// import Topbar from "../Shared/Topbar.js";
// import Sidebar from "../Shared/Sidebar.js";
// import Creatpost from "../Shared/Creatpost.js";
// import WhoToFollow from "../Shared/WhoToFollow.js";
// import SwapContents from '../Swaps/SwapContents.js';
// import Browse from "../Browse/Browse.js";
// import Notifications from '../Notifications/Notifications.js';
// import RequestRow from "./SwapRequestsDisplay/RequestRow.js";
import SwapReviewDispaly from './SwapReview/SwapReviewDisplay.js';
import SwapRequestsDisplay from './SwapRequestsDisplay/SwapRequestsDisplay.js'
export default class SwapRequests extends React.Component {
	constructor(props) {
  super(props);
  this.state = {value: '', review: '',request: 'nav-link active', view: <SwapRequestsDisplay />};
}


renderView = v => {
// if(v == 'home'){
// 	this.setState({value: <StatusContents />});
// }else if(v=='swaps'){
// 	this.setState({value: <SwapContents />});


// }else if(v=='browse'){
//   this.setState({value: <Browse />});


// }
// else if(v=='notifications'){
// 	this.setState({value: <Notifications />});
  
  
//   }
// else {
//   this.setState({value: <StatusContents />});
// }
}

makeSwapRequestsTabActive = () => {
  this.setState({
    request: 'nav-link active',
    review: 'nav-link',
    view: <SwapRequestsDisplay />
  });
}

makeSwapReviewTabActive = () => {
  this.setState({
    request: 'nav-link',
    review: 'nav-link active',
    view: <SwapReviewDispaly />,
  });
}

	render(){


	

		return(
			<div>
    <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={this.state.request} active onClick={() => this.makeSwapRequestsTabActive()} href="#">Swap Requests</a>
        </li>
        <li className="nav-item">
          <a className={this.state.review} active onClick={() => this.makeSwapReviewTabActive()} href="#">Swap Review</a>
        </li>
      </ul>

<div>
{this.state.view}
</div>
			</div>
			);
	}
}