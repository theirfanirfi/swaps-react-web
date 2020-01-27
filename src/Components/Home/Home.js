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
import Swaps from "../Swaps/Swaps.js";
import Browse from "../Browse/Browse.js";

export default class Home extends React.Component {
	constructor(props) {
  super(props);

  this.state = {value: <StatusContents />};
}


renderView = v => {
if(v == 'home'){
	this.setState({value: <StatusContents />});
}else if(v=='swaps'){
	this.setState({value: <Swaps />});


}else if(v=='browse'){
  this.setState({value: <Browse />});


}else {
  this.setState({value: <StatusContents />});
}
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
            
{this.state.value}
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