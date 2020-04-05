import React from "react";


import Topbar from "../Shared/Topbar.js";
import Sidebar from "../Shared/Sidebar.js";
import SearchStatusesTab from './SearchStatusesTab.js';
import SearchUsersTab from './SearchUsersTab.js';
export default class Search extends React.Component {
	constructor(props) {
  super(props);

  this.state = {view: <SearchStatusesTab search={this.props.match.params.s} />, statuses: 'nav-link active', userstab: 'nav-link'};
}
makeStatusesTabActive = () => {
	this.setState({
	  statuses: 'nav-link active',
	  userstab: 'nav-link',
	  view: <SearchStatusesTab search={this.props.match.params.s} />
	});
  }
  
  makeUserTabActive = () => {
	this.setState({
	  statuses: 'nav-link',
	  userstab: 'nav-link active',
	  view: <SearchUsersTab search={this.props.match.params.s} />,
	});
  }
  
componentDidMount(){
	var search = this.props.match.params.s;
	
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
	
			<div>
    <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={this.state.statuses} active onClick={() => this.makeStatusesTabActive()} href="#">Statuses</a>
        </li>
        <li className="nav-item">
          <a className={this.state.userstab} active onClick={() => this.makeUserTabActive()} href="#">Users</a>
        </li>
      </ul>

<div>
{this.state.view}
</div>
			</div>
	
            

</div>

{/* right bar */}
{/* <WhoToFollow /> */}

{/* right bar ended */}
</div>
    	</div>
    </div>
{/* main content ended */}

			</div>
			);
	}
}