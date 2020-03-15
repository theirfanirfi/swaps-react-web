import React from "react";
import Cover from './Cover.js';
import Topbar from "../Shared/Topbar.js";
import StatusContents from "../Home/StatusContents.js";
import SwapContents from '../Swaps/SwapContents.js';
import Connection from '../Connection.js';

export default class Profile extends React.Component {
	constructor(props) {
  super(props);

  this.state = {
	  value: <StatusContents />,
	  stats: [],
	  user: [],
	};
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

componentDidMount(){
	var url = Connection.getBaseUrl()+'profile/getProfileStatsr?token='+Connection.getToken();
	fetch(url)
	.then(res => res.json())
	.then(res => {
		if(res.isError){
			alert(res.message);
		}else if(res.isFound){
			this.setState({
				stats: res.stats,
				user: res.user,
			})
		}
	});
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
		  <Cover tab={this.renderView} stats={this.state.stats} user={this.state.user} />
            
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