import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Link
} from "react-router-dom";
import Connection from "../Connection";
export default class SearchSingleUserRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { follow: '', comblock: '', followState: '' };
  }

  static = {
    user: PropTypes.object,
  }




  followUser(event) {
    event.preventDefault();
    var url = Connection.getBaseUrl() + "followers/follow?token=" + Connection.getToken() + "&id=" + this.props.user.user_id;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.isError || !res.isAuthenticated) {
          alert(res.message);
        } else if (res.isFollowed) {
          this.setState({
            follow: 'Unfollow',
            followState: 1,

          })
        } else {
          alert(res.message);
        }
      })

  }

  unfollowuser(event) {
    event.preventDefault();
    var url = Connection.getBaseUrl() + "followers/unfollow?token=" + Connection.getToken() + "&id=" + this.props.user.user_id;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.isError || !res.isAuthenticated) {
          alert(res.message);
        } else if (res.isUnFollowed) {
          this.setState({
            follow: 'Follow',
            followState: 0,
          })
        } else {
          alert(res.message);
        }
      })
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      follow: this.props.user.isFollowed == 1 ? 'Unfollow' : 'Follow',
      followState: this.props.user.isFollowed == 1 ? 1 : 0,
    });
  }

  returnFollowOrUnFollowBtn() {
    if (this.state.followState == 0) {
      return (
        <a className="btn btn-primary pull-right" onClick={(event) => this.followUser(event)}><i className="icon ion-plus" /> {this.state.follow}</a>
      );
    } else {
      return (
        <a className="btn btn-primary pull-right" onClick={(event) => this.unfollowuser(event)}><i className="icon ion-minus" /> {this.state.follow}</a>
      );
    }
  }



  getUserRoute = () => {
    return "/chat/" + this.props.user.user_id;
  }

  render() {

    return (
      <div className="post-content">
        <Link to={"/profile/" + this.props.user.user_id} style={{ textDecoration: 'none' }}>
          <ToastContainer enableMultiContainer containerId={'B'} autoClose={1500} position={toast.POSITION.TOP_CENTER} />
          {/* <img src="images/post-images/1.jpg" alt="post-image" className="img-responsive post-image" /> */}
          <div className="post-container">
            <img src={this.props.user.profile_image} alt="user" className="profile-photo-md pull-left" />
            <div className="post-detail">
              <div className="user-info">
                <h5><Link to={"/profile/" + this.props.user.user_id} className="profile-link">{this.props.user.name}</Link></h5>


                <p className="text-muted"><b>Member since: </b>{this.props.user.created_at}</p>
              </div>

              <div className="post-text">
                <p style={{ textJustify: 'inherit', color: 'black' }}> {this.props.user.status}
                  <i className="em em-anguished" /> <i className="em em-anguished" /> <i className="em em-anguished" /></p>
              </div>

              <div className="line-divider" />
              <div className="">
                <a className="btn"><i className="fa fa-users" /> Followers: {this.props.user.followers}</a>
                <a className="btn"><i className="fa fa-users" /> Followed: {this.props.user.followed}</a>
                {this.returnFollowOrUnFollowBtn()}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}