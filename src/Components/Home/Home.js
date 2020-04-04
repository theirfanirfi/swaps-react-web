import React from "react";
// import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import HomeIcon from '@material-ui/icons/Home';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import Topbar from "../Shared/Topbar.js";
import Sidebar from "../Shared/Sidebar.js";
import Creatpost from "../Shared/Creatpost.js";
import StatusContents from "./StatusContents.js";
import WhoToFollow from "../Shared/WhoToFollow.js";
import ChatWindow from "../Chat/ChatWindow.js";
export default class Home extends React.Component {
	constructor(props) {
  super(props);
}


	render(){


	

		return(
			<div>
				<Topbar callBack={this.renderView} />
{/* main content */}
        <div id="page-contents">
    	<div className="container-fluid">
    		<div className="row">
          <Sidebar />

          <div className="col-md-7">
            <Creatpost />

			<StatusContents />
</div>

{/* right bar */}
<WhoToFollow />

{/* right bar ended */}
</div>
    	</div>
    </div>
{/* main content ended */}
{/* <ChatWindow /> */}
			</div>
			);
	}
}