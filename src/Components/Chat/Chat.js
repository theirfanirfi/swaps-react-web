import React from "react";
import Connection from '../Connection';

import Topbar from "../Shared/Topbar.js";
import ChatWindow from './ChatWindow.js';
export default class Chat extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		messages: []
	}

	componentDidMount() {
		var id = this.props.match.params.id;
	}


	render() {
		return (
			<div>
				<Topbar callBack={this.renderView} />
				{/* main content */}
				<div id="page-contents" style={{ padding: 0, paddingTop: 12 }}>
					<div className="container">
						<div className="row">

							<div className="col-md-12 col-sm-12 col-lg-12">

								{/* 
			<StatusContents /> */}
								<ChatWindow id={this.props.match.params.id} />
							</div>

							{/* right bar */}


							{/* right bar ended */}
						</div>
					</div>
				</div>
				{/* main content ended */}

			</div>
		);
	}
}