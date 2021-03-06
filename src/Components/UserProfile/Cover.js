import React from "react";
import PropTypes from 'prop-types';
import RatingBar from './RatingBar.js';
import {
  Link
} from "react-router-dom";
import Connection from "../Connection.js";
import { Twitter, Facebook, Linkedin } from 'react-social-sharing'
export default class Cover extends React.Component {

  state = {
    statuses: 'active',
    swaps: '',
    followed_unfollowed: 'Follow'

  }
  static = {
    tab: PropTypes.func,
    stats: PropTypes.object,
    user: PropTypes.object,
  }

  switchTab = (t) => {
    if (t == 'statuses') {
      this.setState({
        statuses: 'active',
        swaps: '',
      }, () => {
        this.props.tab(t);
      })
    } else {
      this.setState({
        statuses: '',
        swaps: 'active',
      }, () => {
        this.props.tab(t);
      })
    }
  }

  getProfileImage() {
    var profile_image = this.props.user.profile_image;
    profile_image = profile_image == null ? '0' : profile_image;
    if ((profile_image != '' || profile_image != null) && profile_image.includes("http", 0)) {
      return profile_image;
    } else {
      return Connection.getWebUrl() + "profile/" + profile_image;
    }
  }

  getCoverImage() {
    var coverimage = this.props.user.cover_image;
    coverimage = coverimage == null ? '0' : coverimage;
    if ((coverimage != '' || coverimage != null) && coverimage.includes("http", 0)) {
      return coverimage;
    } else {
      return Connection.getWebUrl() + "profile/" + coverimage;
    }
  }


  async followUser() {

    var url = Connection.getBaseUrl() + "followers/follow?token=" + Connection.getToken() +
      '&id=' + this.props.user.user_id;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.isError) {
          alert(res.message);
        } else if (res.isFollowed) {
          this.setState({
            followed_unfollowed: 'unfollow'
          })
        } else {
          alert(res.message);
        }
      })
  }



  render() {
    return (
      <div className="timeline-cover" style={{ backgroundImage: "url('" + this.getCoverImage() + "')" }}>
        {/*Timeline Menu for Large Screens*/}

        <div className="timeline-nav-bar hidden-sm hidden-xs">
          {/* <div className="row" >
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
        <div className="col-md-3">{this.props.user.profile_description}</div>
              </div> */}
          <div className="row">
            <div className="col-md-3">
              <div className="profile-info">

                <img src={this.getProfileImage()} alt="" className="img-responsive profile-photo" />
                {/* <p className="text-muted">Creative Director</p> */}
              </div>
            </div>
            <div className="col-md-9">
              <h3>{this.props.user.name}</h3>

              <p>
                <RatingBar stats={this.props.stats} />
                <Twitter link={this.props.user.twitter_profile_link} />
                <Facebook link={this.props.user.fb_profile_link} />
                <Linkedin link={this.props.user.linkedin_profile_link} />
              </p>
              <ul className="list-inline profile-menu">
                <li><Link onClick={() => this.switchTab('statuses')} className={this.state.statuses}>Statuses {this.props.stats.statuses}</Link></li>
                <li><Link onClick={() => this.switchTab('swaps')} className={this.state.swaps}>Swaps {this.props.stats.swaps}</Link></li>
                {/* <li><a href="timeline-album.html">Album</a></li>
                    <li><a href="timeline-friends.html">Friends</a></li> */}
              </ul>
              <ul className="follow-me list-inline">

                <li><b>{this.props.stats.followers}</b> Followers</li>
                <li><Link to={("/chat/" + this.props.user.user_id)} ><i className="fa fa-comments"></i> Chat</Link></li>
                <li><button onClick={() => this.followUser()} className="btn-primary">{this.state.followed_unfollowed}</button></li>
              </ul>
            </div>
          </div>
        </div>{/*Timeline Menu for Large Screens End*/}
        {/*Timeline Menu for Small Screens*/}
        <div className="row">
          <div className="navbar-mobile hidden-lg hidden-md" style={{ position: 'initial' }}>
            <div className="profile-info">
              <img src={this.getProfileImage()} alt="" className="img-responsive profile-photo" style={{ width: '40%', height: '10%' }} />
            </div>
            <div className="mobile-menu">
              <h4>{this.props.user.name}</h4>
              <RatingBar stats={this.props.stats} />
              <Twitter link={this.props.user.twitter_profile_link} />
              <Facebook link={this.props.user.fb_profile_link} />
              <Linkedin link={this.props.user.linkedin_profile_link} />
              <ul className="list-inline">
                <li><Link style={{ color: 'white' }} onClick={() => this.switchTab('statuses')} className={this.state.statuses}>Statuses {this.props.stats.statuses}</Link></li>
                <li><Link style={{ color: 'white' }} onClick={() => this.switchTab('swaps')} className={this.state.swaps}>Swaps {this.props.stats.swaps}</Link></li>
                {/* <li><a href="timeline-album.html">Album</a></li>
                  <li><a href="timeline-friends.html">Friends</a></li> */}
              </ul>
              <button onClick={() => this.followUser()} className="btn-primary">{this.state.followed_unfollowed}</button>
            </div>
          </div>{/*Timeline Menu for Small Screens End*/}

        </div>

      </div>
    );
  }
}