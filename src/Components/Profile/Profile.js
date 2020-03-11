import React from "react";
import Cover from './Cover.js';

import Topbar from "../Shared/Topbar.js";

import StatusContents from "../Home/StatusContents.js";

import SwapContents from '../Swaps/SwapContents.js';
export default class Profile extends React.Component {
	constructor(props) {
  super(props);

  this.state = {value: <StatusContents />};
}


renderView = v => {
if(v == 'statuses'){
	this.setState({value: <StatusContents />});
}else if(v=='swaps'){
	this.setState({value: <SwapContents />});


}
else {
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



          <div className="col-md-12">
		  <Cover tab={this.renderView} />
            
</div>

</div>





    	</div>




    </div>
{/* main content ended */}

<div className="container-fluid">
		<div className="row">
	<div className="col-md-3"></div>
	<div className="col-md-7">
{this.state.value}

	</div>

</div>
		</div>
			</div>
			);
	}
}