import React from "react";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";

export default class TopbarChatList extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {message: []};
    }

    static = {
        message: PropTypes.object
    }

    amIUserOne() {
        if (this.props.message.amIuserOne == 1) {
            // console.log('userone');
            return this.props.message.user_two_name;
        } else {
            // console.log('usertwo');
            return this.props.message.user_one_name;
        }
    }

    getUserTwoId() {
        if (this.props.message.amIuserOne == 1) {
            // console.log('userone');
            return this.props.message.user_two;
        } else {
            // console.log('usertwo');
            return this.props.message.user_one;
        }
    }

    getProfileImage() {
        console.log(this.props.message.amIuserOne)
        if (this.props.message.amIuserOne == 1) {
            return this.props.message.user_two_profile_image;
        } else {
            return this.props.message.user_one_profile_image;
        }
    }
    render() {
        return (
            <li style={{ padding: '6px', borderBottomWidth: '1px', borderBottomColor: 'black' }}>
                <Link to={("/chat/" + this.getUserTwoId())}>
                    <img src={this.getProfileImage()} className="profile-photo-sm pull-left" />
                    <b> &nbsp;{this.amIUserOne()} </b>
                    <span className="badge pull-right">{this.props.message.unread_count}</span>
                    <p style={{ wordWrap: 'break-word', color: 'gray', marginLeft: '6px', marginTop: '6px' }}>{this.props.message.last_msg} </p>
                </Link>
            </li>
        );
    }
}