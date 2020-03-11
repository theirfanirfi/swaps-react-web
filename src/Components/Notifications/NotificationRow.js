import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Comments from '../Shared/Comment/Comments';
import RatingBar from '../Shared/RatingBar/RatingBar';
import PostComment from '../Shared/Comment/PostComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Connection from '../Connection.js';
import StatusSwapedOrShared from "../Shared/StatusSwapedOrShared/StatusSwapedOrShared.js";
import SingleStatus from '../Shared/SingleStatus.js';

export default class SingleBrowseStatus extends React.Component {
	constructor(props) {
  super(props);

  //this.state = {refreshComments: true,status: [], likescount: -1,isLiked: false, isShared: false, sharecount: 0, visibility: false, comblock: ''};
}

static = {
    notification: PropTypes.object,
}


returnTextBasedOnAction(){
if(this.props.notification.isShare == 1){
    return (" shared your");
}else if(this.props.notification.isLike == 1){
    return " liked your";
}else if(this.props.notification.isComment == 1){
    return " commented on";
}
}

componentDidMount(){
//   this.setState({
//     status: this.props.status,
//     likescount: this.props.status.likes_count,
//     isLiked: this.props.status.isLiked,
//     sharecount: this.props.status.shares_count
//   });

console.log(this.props.notification)
}


	render(){

		return(
            <div className="feed-item">
            <img src={this.props.notification.profile_image} alt="user" className="img-responsive profile-photo-sm" />
            <div className="live-activity">
        <p><a href="#" className="profile-link">{this.props.notification.name}</a> 
        
        {this.returnTextBasedOnAction()} status.</p>

        <div style={{display: 'flex', marginTop:12 ,justifyContent:'center', alignItems:'center',width: '80%'}}>
        <SingleStatus status={this.props.notification} />
        </div>
        <p className="text-muted">{this.props.notification.created_at}</p>


            </div>
          </div>
			);
	}
}