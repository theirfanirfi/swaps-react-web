import React from "react";
// import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// import HomeIcon from '@material-ui/icons/Home';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import LocationOnIcon from '@material-ui/icons/LocationOn';

import Topbar from "../Shared/Topbar.js";
import Sidebar from "../Shared/Sidebar.js";
import Creatpost from "../Shared/Creatpost.js";
import WhoToFollow from "../Shared/WhoToFollow.js";
import SwapContents from './SwapContents.js';
export default class SwapsTab extends React.Component {
	constructor(props) {
  super(props);

//   this.state = {value: <StatusContents />};
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
            
<SwapContents />
</div>

{/* right bar */}
<WhoToFollow />

{/* right bar ended */}
</div>
    	</div>
    </div>
{/* main content ended */}

			</div>
			);
	}
}