import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from "../Shared/Comment/Comments";
import PostComment from "../Shared/Comment/PostComment";
import RatingBar from "../Shared/RatingBar/RatingBar";
import Connection from '../Connection.js';

import {
  Link
} from "react-router-dom";
import SingleStatusComments from "./SingleStatusComments";
export default class SingleStatus extends React.Component {
	constructor(props) {
  super(props);

  this.state = {refreshComments: true,status: [], likescount: -1,isLiked: false, isShared: false, sharecount: 0, visibility: false, comblock: ''};
}

static = {
    status: PropTypes.object,
    loading: true,
}

displayCarouselIfHasAttachements(status){
  if (status.has_attachment == 1) {
// console.log(status.attachments);
var images = JSON.parse(status.attachments);
  var image = images.map((im,i) => {
    return (<div key={i} style={{height: '300px'}}><img className="img-responsive"  src={im.attachment_url}  /></div>);
  });

   return image;
  }else {
    //console.log('no');

  }
}

showComments = status_id => {
  this.setState({
    visibility: !this.state.visibility
  },() => {
    this.fetchComments(status_id);
  });
}

unShare = status_id => {
  confirmAlert({
    title: 'Unshare Status',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {

          var token = Connection.getToken();
          var url = Connection.getBaseUrl();
          url += "ushares?status_id="+status_id+"&token="+token;
          // var url = "http://192.168.10.3/swap/public/api/ushares?status_id="+status_id+"&token="+token;
          fetch(url)
          .then(res => res.json())
          .then((res) => {
           if(res.UnShared){
            toast.success('Status liked',{containerId: 'B'});
           }else if(res.isShared){
             
           }
            // this.setState({
            //   sharecount: res.StatusLikes,
            //   isShared: res.isLiked
            // })
          });

        }
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
};

componentDidMount(){

  this.setState({
    status: this.props.status,
    likescount: this.props.status.likes_count,
    isLiked: this.props.status.isLiked,
    sharecount: this.props.status.shares_count
  },() => {
      console.log(this.state.likescount);
  });
}

statusActionColors(action,status){
  if(action == 'like'){
    if(this.state.isLiked){
     return "red"; 
    }else {
      return "gray"; 
    }
  }else if(action == 'share'){

  }else if(action == 'comment'){

  }
}

likeStatus = status_id =>{

  // toast.success('Status liked',{containerId: 'B'});

  var token = Connection.getToken();
  var url = Connection.getBaseUrl();
  url += "likes?status_id="+status_id+"&token="+token;
  // var url = "http://192.168.10.3/swap/public/api/likes?status_id="+status_id+"&token="+token;
  fetch(url)
  .then(res => res.json())
  .then((res) => {
    this.setState({
      likescount: res.StatusLikes,
      isLiked: res.isLiked
    })
  });
}


shareStatus = status_id =>{
  var token = Connection.getToken();
  var url = Connection.getBaseUrl();
  url += "shares?status_id="+status_id+"&token="+token;
  // var url = "http://192.168.10.3/swap/public/api/shares?status_id="+status_id+"&token="+token;
  fetch(url)
  .then(res => res.json())
  .then((res) => {
   if(res.isAlreadyShared){
     this.unShare(status_id);
   }else if(res.isShared){

   }
    // this.setState({
    //   sharecount: res.StatusLikes,
    //   isShared: res.isLiked
    // })
  });
}

commentMade = commentt => {
    var comp = this.state.comblock;
    if(comp.length > 0){
  var com = <Comments comment={commentt} key={comp.length+1} />;
  comp.push(com);
  this.setState({
    comblock: comp,
  }
  
  , () => {
    this.fetchComments(commentt.status_id);
  }
  
  );
}else {
  this.setState({
    comblock: com
  }
  
  , () => {
    this.fetchComments(commentt.status_id);
  }
  
  );
}
  // console.log("single: "+comment.comment);
}

fetchComments = status_id => {
    // alert(status_id);
  var token = Connection.getToken();
  var url = Connection.getBaseUrl();
  url += "getcomments?status_id="+status_id+"&token="+token;
  // var url = "http://192.168.10.3/swap/public/api/getcomments?status_id="+status_id+"&token="+token;
    fetch(url)
    .then(res => res.json())
    .then((res) => {
      if(res.isFound){
      var comments = res.comments;
      console.log("comments: "+comments);
      var comblockk = comments.map((comment,i) => {
        return <Comments comment={comment} key={i} />
      });

    //   this.setState({comblock: comblockk});
    return comblockk;


      }
    })

}

refreshComments(){
  return this.state.comblock;
}

tagUsers(){
  if(this.props.status.is_users_tagged){
    return (
  <span className="following" >with <span style={{color:'#B401FF', fontSize:'10px'}}>{this.props.status.first_tag} and {this.props.status.tag_count} other</span></span>
    );
  }
}

getStatusRoute = () => {
return "/status/"+this.props.status.status_id;
}

	render(){
		return(
            <div>

            
<div className="post-content">

  <Link to={"/status/"+this.props.status.status_id} style={{textDecoration:'none'}} >
<ToastContainer enableMultiContainer containerId={'B'} autoClose={1500} position={toast.POSITION.TOP_CENTER} />
        {/* <img src="images/post-images/1.jpg" alt="post-image" className="img-responsive post-image" /> */}
        <div className="post-container">
          <img src={this.props.status.profile_image} alt="user" className="profile-photo-md pull-left" />
          <div className="post-detail">
            <div className="user-info">
              <h5><a href="timeline.html" className="profile-link">{this.props.status.name}</a>{this.tagUsers()}</h5>
              
              
              <p className="text-muted">{this.props.status.created_at}</p>
            </div>

            <div className="post-text">
              <p style={{textJustify:'inherit',color:'black'}}> {this.props.status.status}
               <i className="em em-anguished" /> <i className="em em-anguished" /> <i className="em em-anguished" /></p>
            </div>
            <Carousel>
            {this.displayCarouselIfHasAttachements(this.props.status)}
            </Carousel>
            <RatingBar status={this.props.status} />
            <div className="line-divider" />
            <div className="">
    <a  style={{color:this.statusActionColors('like',this.state.isLiked)}} className="btn"><i onClick={() => this.likeStatus(this.props.status.status_id)} className="icon ion-heart" /> {this.state.likescount}</a>
    <a className="btn " style={{color:'gray'}}><i className="icon ion-share" onClick={() => this.shareStatus(this.props.status.status_id)}   /> {this.state.sharecount}</a>
    <a className="btn"><i className="fa fa-comment" onClick={() => this.showComments(this.props.status.status_id)} /> {this.props.status.comments_count}</a>
            </div>
            <div >
                
            {/* {this.state.comblock} */}
            {/* {this.fetchComments(this.props.status.status_id)} */}
            <SingleStatusComments status_id={this.props.status.status_id} />
            <PostComment callMeAfterComment={this.commentMade} status={this.props.status} />

            </div>
          </div>
        </div>
        </Link>
      </div>

      </div>
			);
	}
}