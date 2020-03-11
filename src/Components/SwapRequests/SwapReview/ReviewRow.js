import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
// import Comments from '../Shared/Comment/Comments';
// import RatingBar from '../Shared/RatingBar/RatingBar';
// import PostComment from '../Shared/Comment/PostComment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Connection from '../../Connection.js';
// import StatusSwapedOrShared from "../Shared/StatusSwapedOrShared/StatusSwapedOrShared.js";
import SingleStatus from './SingleStatus.js';
import ReviewDialog from './ReviewDialog.js';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RatingBar from "./RatingBar";


export default class ReviewRow extends React.Component {
	constructor(props) {
  super(props);

  //this.state = {refreshComments: true,status: [], likescount: -1,isLiked: false, isShared: false, sharecount: 0, visibility: false, comblock: ''};
}

static = {
    notification: PropTypes.object,
}

state = {
    review: 'Review',
    value: '',
    open: false,
    rating: 0,
    disabled: false
}

handleClickOpen = () => {
    this.setState({
        open: !this.state.open
    })
   };
 
    handleClose = () => {
     this.setState({
         open: !this.state.open
     })
   };

/*
{"isAuthenticated":true,"isFound":true,"isError":false,"swaps":
[{"timer":"12952.8000","isMe":"false","user_id":null,"swap_id":20,"is_accepted":1,"poster_user_id":8,"swaped_with_user_id":3,
"poster_user_name":"HFM Irfan","swaped_with_user_name":"Irfan Ullah","status":"hello","has_attachment":0,"attachments":"",
"status_id":2,"swap_date":"2019-12-12 22:07:10",
"poster_profile_image":"https:\/\/canadianpizzaunlimited.ca\/images\/slider\/PickUpSpecial2.jpg",
"swaped_with_profile_image":"http:\/\/192.168.10.7\/swap\/public\/profile\/708006Irfan Ullah1563270684",
"tag_count":1,"first_tag":"GSA User","avg_ratting":"3.0000","likes_count":0,"isLiked":0,"shares_count":1,
"comments_count":2}
*/

returnTextBasedOnAction(){
if(this.props.notification.isShare == 1){
    return (" shared your");
}else if(this.props.notification.isLike == 1){
    return " liked your";
}else if(this.props.notification.isComment == 1){
    return " commented on";
}
}

hasLoggedInUserSwapped(){
    console.log(this.props.notification.isMe)
    if(this.props.notification.isMe == true){
        return (
            <div>
The swap with <a href="#" className="profile-link">{this.props.notification.poster_user_name}</a> has expired, please review it.
</div>
        );
    }else {
        return (
            <div>
The Status swaped by <a href="#" className="profile-link">{this.props.notification.poster_user_name}</a> with <b>you</b> has expired, please review the it.
</div>
        );
    }
}

ratingCallBack = rating => {
this.setState({
    rating: rating
})
}

reviewSwapRequest= () => {

    var url = Connection.getBaseUrl();
    var token = Connection.getToken();
    url += 'swaps/rvswap?token='+token+'&id='+this.props.notification.swap_id+'&rv='+this.state.value+'&rt='+this.state.rating;
    fetch(url)
    .then(res => res.json())
    .then(text => {
      if(text.isAuthenticated){
        if(text.isError){
            alert(text.message);
        }else if(text.isReviewed){
            this.setState({
                review: 'Reviewed',
                open: !this.state.open,
                disabled: true
            })
            alert(text.message);
        }else {
            alert(text.message);
        }
      }
    })
}


displayDialog () {
    return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={() => this.handleClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
                <h4>Review Swap</h4>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <RatingBar callBack={this.ratingCallBack} />

              <textarea name="texts" id="exampleTextarea" cols={30} rows={4} className="form-control" onChange={(text) => {this.setState({value: text.target.value})}} placeholder="Write what you wish"  >
                  {this.state.value}
                  </textarea>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this.reviewSwapRequest()} color="primary" autoFocus>
                Review
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}


review(){



this.setState({
    open: !this.state.open
})
}

componentDidMount(){

}


	render(){

		return(
            <div className="feed-item">
            <img src={this.props.notification.swaped_with_profile_image} alt="user" className="img-responsive profile-photo-sm" />
            <div className="live-activity">
            <p>
        {this.hasLoggedInUserSwapped()}
        <span>
        <button class="btn-primary pull-right" onClick={() => this.review()} disabled={this.state.disabled}>{this.state.review}</button>
        {this.displayDialog()}
        </span>
        </p>

        <div style={{display: 'flex', marginTop:12 ,justifyContent:'center', alignItems:'center',width: '80%'}}>
        <SingleStatus status={this.props.notification} />
        </div>
        <p className="text-muted">{this.props.notification.created_at}</p>


            </div>
          </div>
			);
	}
}