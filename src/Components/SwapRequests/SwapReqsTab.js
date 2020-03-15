import React from "react";


import Topbar from "../Shared/Topbar.js";
import Sidebar from "../Shared/Sidebar.js";
import Creatpost from "../Shared/Creatpost.js";
import WhoToFollow from "../Shared/WhoToFollow.js";
import SwapRequests from "./SwapRequests.js";
export default class SwapReqsTab extends React.Component {
	constructor(props) {
  super(props);

//   this.state = {value: <StatusContents />};
}


	render(){


	

		return(
			<div>
				<Topbar />
{/* main content */}
        <div id="page-contents">
    	<div className="container-fluid">
    		<div className="row">
          <Sidebar />

          <div className="col-md-7">
            <Creatpost />
            
<SwapRequests />
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