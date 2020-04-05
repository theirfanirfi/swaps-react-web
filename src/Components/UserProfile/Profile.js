import React from "react";
import Cover from './Cover.js';
import Topbar from "../Shared/Topbar.js";
import StatusContents from "../Home/StatusContents.js";
import SwapContents from '../Swaps/SwapContents.js';
import Connection from '../Connection.js';
import ClipLoader from "react-spinners/ClipLoader";
export default class Profile extends React.Component {
	constructor(props) {
  super(props);

  this.state = {
	  value: <StatusContents />,
	  stats: [],
	  user: [],
	  loading: true,
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
	var profile_id = this.props.match.params.id;
	var url = Connection.getBaseUrl()+'profile/getProfileStatsr?token='+Connection.getToken();
	fetch(url)
	.then(res => res.json())
	.then(res => {
		if(res.isAuthenticated){
			if(res.isFound){
				this.setState({
					stats: res.stats,
					user: res.user,
					loading: false
				})
			}else {
				this.setState({
				  loading: false
				}, () => {
					alert(res.message)
				})
			  }
		}else {
			this.setState({
			  loading: false
			}, () => {
				alert(res.message)
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
		  <div style={{width:'100%',padding:'8px',display: 'flex',  justifyContent:'center', alignItems:'center',}}>
			<ClipLoader
          size={20}
          color={"#123abc"}
          loading={this.state.loading}
        />
		</div>
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