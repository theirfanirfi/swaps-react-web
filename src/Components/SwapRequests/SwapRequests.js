import React from "react";
import SwapReviewDispaly from './SwapReview/SwapReviewDisplay.js';
import SwapRequestsDisplay from './SwapRequestsDisplay/SwapRequestsDisplay.js'
export default class SwapRequests extends React.Component {
	constructor(props) {
  super(props);
  this.state = {value: '', review: '',request: 'nav-link active', view: <SwapRequestsDisplay />};
}



makeSwapRequestsTabActive = () => {
  this.setState({
    request: 'nav-link active',
    review: 'nav-link',
    view: <SwapRequestsDisplay />
  });
}

makeSwapReviewTabActive = () => {
  this.setState({
    request: 'nav-link',
    review: 'nav-link active',
    view: <SwapReviewDispaly />,
  });
}

	render(){


	

		return(
			<div>
    <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={this.state.request} active onClick={() => this.makeSwapRequestsTabActive()} href="#">Swap Requests</a>
        </li>
        <li className="nav-item">
          <a className={this.state.review} active onClick={() => this.makeSwapReviewTabActive()} href="#">Swap Review</a>
        </li>
      </ul>

<div>
{this.state.view}
</div>
			</div>
			);
	}
}