import React from 'react';
import PropTypes from 'prop-types';
import Connection from '../../Connection';

export default class Comments extends React.Component {
  static = {
    comment: PropTypes.object
  }

  render() {
    return (
      <div>
        <div className="line-divider"></div>
        <div className="post-comment">
          <img src={Connection.getProfileImageForUsers(this.props.comment.profile_image)} alt="" className="profile-photo-sm" />
          <p><a href="#" className="profile-link"> {this.props.comment.name}</a> <br /> {this.props.comment.comment} </p>
        </div>
      </div>
    );
  }
}