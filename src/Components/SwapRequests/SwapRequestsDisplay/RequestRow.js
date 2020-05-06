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
import SingleStatus from '../../Shared/SingleStatus.js';

export default class RequestRow extends React.Component {
    constructor(props) {
        super(props);

        //this.state = {refreshComments: true,status: [], likescount: -1,isLiked: false, isShared: false, sharecount: 0, visibility: false, comblock: ''};
    }

    static = {
        notification: PropTypes.object,
    }

    state = {
        approve: 'Approve',
        decline: 'Decline'
    }

    /*
    {"isAuthenticated":true,"isFound":true,"count":1,"notifications":[{"status_id":15,"isAccepted":0,"swap_id":14,"swaper_id":28,
    "name":"GSA User","profile_image":"http:\/\/192.168.10.7\/swap\/public\/profile\/234302GSA User1570080037","isStatus":1,"isFollow":0,
    "notification_id":13,"created_at":"2019-11-11 20:19:14","follower_id":0}]}
    */

    returnTextBasedOnAction() {
        if (this.props.notification.isShare == 1) {
            return (" shared your");
        } else if (this.props.notification.isLike == 1) {
            return " liked your";
        } else if (this.props.notification.isComment == 1) {
            return " commented on";
        }
    }

    decline() {
        var url = Connection.getBaseUrl();
        var token = Connection.getToken();
        url += 'notifications/declineSwap?token=' + token + '&notification_id=' + this.props.notification.notification_id;
        fetch(url)
            .then(res => res.json())
            .then(text => {
                if (text.isAuthenticated) {
                    if (text.isError) {
                        alert(text.message);
                    } else if (text.isDeclined) {
                        this.setState({
                            decline: 'Declined',
                            approve: 'Approve'
                        })
                        alert(text.message);
                    } else {
                        alert(text.message);
                    }
                }
            })
    }

    approve() {

        var url = Connection.getBaseUrl();
        var token = Connection.getToken();
        url += 'notifications/approveSwap?token=' + token + '&notification_id=' + this.props.notification.notification_id;
        fetch(url)
            .then(res => res.json())
            .then(text => {
                if (text.isAuthenticated) {
                    if (text.isError) {
                        alert(text.message);
                    } else if (text.isApproved) {
                        this.setState({
                            decline: 'Decline',
                            approve: 'Approved'
                        })
                        alert(text.message);
                    } else {
                        alert(text.message);
                    }
                }
            })
        // alert(this.props.notification.status_id);
    }

    componentDidMount() {
        //   this.setState({
        //     status: this.props.status,
        //     likescount: this.props.status.likes_count,
        //     isLiked: this.props.status.isLiked,
        //     sharecount: this.props.status.shares_count
        //   });
    }


    render() {

        return (
            <div className="feed-item">
                <img src={this.props.notification.profile_image} alt="user" className="img-responsive profile-photo-sm" />
                <div className="live-activity">
                    <p><a href="#" className="profile-link">{this.props.notification.name}</a> wants to swap a status with you.
                    <p><strong>From: </strong></p>
                        <span>
                            <button style={{ marginRight: 4 }} class="btn-sm btn-danger pull-right" onClick={() => this.decline()}>{this.state.decline}</button>
                            <button style={{ marginRight: 4 }} class="btn-sm btn-success pull-right" onClick={() => this.approve()}>{this.state.approve}</button>
                        </span>
                    </p>

                    <div style={{ display: 'flex', marginTop: 12, justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                        <SingleStatus status={this.props.notification} />
                    </div>
                    <p className="text-muted">{this.props.notification.created_at}</p>


                </div>
            </div>
        );
    }
}