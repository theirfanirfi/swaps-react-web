import React from "react";
import Cover from './Cover.js';
import Topbar from "../Shared/Topbar.js";
import StatusesProfileTab from '../Shared/Profile/StatusesProfileTab.js';
import SwapsProfileTab from '../Shared/Profile/SwapsProfileTab.js';
import Connection from '../Connection.js';
import ClipLoader from "react-spinners/ClipLoader";

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			view: '',
			stats: [],
			statuses: [],
			swaps: [],
			user: [],
			loading: true,
		};
	}


	renderView = v => {
		if (v == 'statuses') {
			this.setState({ view: <StatusesProfileTab statuses={this.state.statuses} /> });
		} else if (v == 'swaps') {
			this.setState({ view: <SwapsProfileTab swaps={this.state.swaps} /> });


		}
		else {
			this.setState({ view: <StatusesProfileTab /> });
		}
	}

	componentDidMount() {
		var profile_id = this.props.match.params.id;
		// const { match: { params } } = this.props;
		console.log("id: " + profile_id);
		var url = Connection.getBaseUrl() + 'profile/getProfileStatsr?token=' + Connection.getToken();
		fetch(url)
			.then(res => res.json())
			.then(res => {
				if (res.isAuthenticated) {
					if (res.isFound) {
						this.setState({
							stats: res.stats,
							user: res.user,
							statuses: res.statuses,
							swaps: res.swaps,
							view: <StatusesProfileTab statuses={res.statuses} />,
							loading: false
						})
					} else {
						this.setState({
							loading: false
						}, () => {
							alert(res.message)
						})
					}
				} else {
					this.setState({
						loading: false
					}, () => {
						alert(res.message)
					})
				}
			});
	}


	render() {




		return (
			<div>
				<Topbar callBack={this.renderView} />
				{/* main content */}
				<div id="page-contents">
					<div className="container-fluid">
						<div className="row">



							<div className="col-md-12">
								<div style={{ width: '100%', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
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
							{this.state.view}

						</div>

					</div>
				</div>
			</div>
		);
	}
}
