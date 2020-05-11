import React from "react";
import PropTypes from 'prop-types';
import RatingBar from './RatingBar.js';
import {
  Link
} from "react-router-dom";
import ImageUploader from 'react-images-upload';
import Axios from "axios";
import Connection from "../Connection.js";
export default class Cover extends React.Component {

  state = {
    profile: 'active',
    smlinks: '',
    passwordTab: '',
    cover_image: this.props.user.cover_image,
    profile_image: this.props.user.profile_image,
    save_cover_image: false,
    save_profile_image: false,
    cover_image_upload_file: null,
    profile_image_upload_file: null,

  }
  static = {
    tab: PropTypes.func,
    stats: PropTypes.object,
    user: PropTypes.object,
  }
  componentDidMount() {
    // this.setState({
    //   profile_image: this.props.user.profile_image,
    //   cover_image: Connection.getWebUrl() + "profile/" + this.props.user.cover_image,
    // })
  }

  changeCoverImage = file => {
    let image_to_select = file.length > 0 ? file.length - 1 : 0;
    this.setState({
      cover_image: URL.createObjectURL(file[image_to_select]),
      cover_image_upload_file: file[image_to_select],
      save_cover_image: true
    })
  }

  changeProfileImage = file => {
    let image_to_select = file.length > 0 ? file.length - 1 : 0;
    this.setState({
      profile_image: URL.createObjectURL(file[image_to_select]),
      profile_image_upload_file: file[image_to_select],
      save_profile_image: true
    })
  }

  getCoverImage() {
    if (this.state.cover_image != null) {
      console.log('state cover image')
      return this.state.cover_image
    } else if (this.props.user.cover_image) {
      console.log('props cover image')
      return Connection.getWebUrl() + "profile/" + this.props.user.cover_image
    }
    else {
      return ''
    }
  }

  getProfileImage() {
    if (this.state.profile_image != null) {
      return this.state.profile_image
    } else if (this.props.user.profile_image) {
      return Connection.getWebUrl() + "profile/" + this.props.user.profile_image
    }
    else {
      return ''
    }
  }

  uploadCoverImage = () => {
    const fd = new FormData();
    fd.append('image', this.state.cover_image_upload_file, this.state.cover_image_upload_file.name);
    var url = Connection.getBaseUrl() + "profile/uploadcover?token=" + Connection.getToken();
    Axios.post(url, fd).then(res => {
      alert(res.data.message);
    })
  }

  uploadProfileImage = () => {
    const fd = new FormData();
    fd.append('image', this.state.profile_image_upload_file, this.state.profile_image_upload_file.name);
    var url = Connection.getBaseUrl() + "profile/uploadprofile?token=" + Connection.getToken();
    Axios.post(url, fd).then(res => {
      alert(res.data.message);
    })
  }

  switchTab = (t) => {
    if (t == 'profile') {
      this.setState({
        profile: 'active',
        smlinks: '',
        passwordTab: '',
      }, () => {
        this.props.tab(t, this.props.user);
      })
    } else if (t == 'sm') {
      this.setState({
        profile: '',
        smlinks: 'active',
        passwordTab: '',
      }, () => {
        this.props.tab(t, this.props.user);
      })
    } else if (t == 'password') {
      this.setState({
        profile: '',
        smlinks: '',
        passwordTab: 'active',
      }, () => {
        this.props.tab(t, this.props.user);
      })
    }
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
                <ul className="follow-me" style={{ padding: '12px' }}>
                  <p>
                    <ImageUploader label='' fileContainerStyle={{ all: 'none', background: 0 }} withIcon={false} buttonText="Change Profile image" onChange={(file) => this.changeProfileImage(file)} accept="image/*" />
                  </p>
                  <p>
                    {this.state.save_profile_image &&
                      <a onClick={() => this.uploadProfileImage()} className="btn-sm btn-default" style={{ textDecoration: 'none', cursor: 'pointer' }}> Save</a>
                    }
                  </p>

                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <h3>{this.props.user.name}</h3>

              <p>
                <RatingBar stats={this.props.stats} />
              </p>
              <ul className="list-inline profile-menu">
                <li><Link onClick={() => this.switchTab('profile')} className={this.state.profile}>Profile </Link></li>
                <li><Link onClick={() => this.switchTab('sm')} className={this.state.smlinks}>Social Meida Links</Link></li>
                <li><Link onClick={() => this.switchTab('password')} className={this.state.passwordTab}>Change Password</Link></li>
                {/* <li><a href="timeline-album.html">Album</a></li>
                    <li><a href="timeline-friends.html">Friends</a></li> */}
              </ul>
              <ul className="follow-me" style={{ padding: '12px' }}>
                <p>
                  <ImageUploader label='' fileContainerStyle={{ all: 'none', background: 0 }} withIcon={false} buttonText="Change Cover image" onChange={(file) => this.changeCoverImage(file)} accept="image/*" />
                </p>
                <p>
                  {this.state.save_cover_image &&
                    <a onClick={() => this.uploadCoverImage()} className="btn-sm btn-default" style={{ textDecoration: 'none', cursor: 'pointer' }}> Save</a>
                  }
                </p>

              </ul>
            </div>
          </div>
        </div>{/*Timeline Menu for Large Screens End*/}
        {/*Timeline Menu for Small Screens*/}
        <div className="row">
          <div className="navbar-mobile hidden-lg hidden-md" style={{ position: 'initial' }}>
            <div className="profile-info">
              <img src={this.state.profile_image} alt="" className="img-responsive profile-photo" style={{ width: '40%', height: '10%' }} />
            </div>
            <div className="mobile-menu">
              <h4>{this.props.user.name}</h4>
              <RatingBar stats={this.props.stats} />

              <ul className="list-inline">
                <li><Link style={{ color: 'white' }} onClick={() => this.switchTab('profile')} className={this.state.profile}>Profile</Link></li>
                <li><Link style={{ color: 'white' }} onClick={() => this.switchTab('sm')} className={this.state.smlinks}>Social Meida Links</Link></li>
                <li><Link style={{ color: 'white' }} onClick={() => this.switchTab('password')} className={this.state.passwordTab}>Change Password</Link></li>
                {/* <li><a href="timeline-album.html">Album</a></li>
                  <li><a href="timeline-friends.html">Friends</a></li> */}
              </ul>
              <input type="file" onChange={(file) => {
                var f = file.target.files[0]
                this.setState({
                  cover_image: URL.createObjectURL(file.target.files[0]),
                  save_cover_image: true
                })
              }} placeholder="select cover image" accept="image/*" />
              <p>
                {this.state.save_cover_image &&
                  <a> Save</a>
                }
              </p>
            </div>
          </div>{/*Timeline Menu for Small Screens End*/}

        </div>

      </div >
    );
  }
}