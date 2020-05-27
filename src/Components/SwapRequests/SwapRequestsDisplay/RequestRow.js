import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Connection from '../../Connection.js';
import SingleStatus from '../../Shared/SingleStatus.js';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

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
        decline: 'Decline',
        startDate: null,
        endDate: null,
        focusedInput: ''
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
        this.setState({
            startDate: moment(this.toDate(this.props.notification.swap_start_date)),
            endDate: moment(this.toDate(this.props.notification.swap_end_date)),
        })
    }

    toDate(timestamp) {
        var d = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
        // var tempDate = new Date(timestamp);
        // return tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        d = d.replace('/', '-');
        d = d.replace('/', '-');
        // return d.substring(0, 10);
        return d;
    }

    requestModifcation() {
        var url = Connection.getBaseUrl() + "swaps/requestmodification?token=" + Connection.getToken() + '&id=' + this.props.notification.swap_id +
            '&sd=' + this.state.startDate + '&ed=' + this.state.endDate;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                alert(res.message);
            })
    }

    isModificationrequestedAndByWhom() {
        //by swaper or swapped with
        if (this.props.notification.is_modification_requested == 1 && this.props.notification.is_modification_requested_by_me == 1) {
            return (
                <div>
                    <button style={{ marginRight: 4 }} class="btn-sm btn-danger" onClick={() => this.decline()}>{this.state.decline}</button>
                    <button className="btn-sm btn-info" disabled>You have requested modification</button>
                </div>
            )
        } else if (this.props.notification.is_modification_requested == 1 && this.props.notification.is_modification_requested_by_me == 0) {
            return (
                <div>
                    <button style={{ marginRight: 4 }} class="btn-sm btn-danger" onClick={() => this.decline()}>{this.state.decline}</button>
                    <button style={{ marginRight: 4 }} class="btn-sm btn-success" onClick={() => this.approve()}>{this.state.approve}</button>
                    <button className="btn-sm btn-info" onClick={() => this.requestModifcation()}>Modification is Requested</button>
                </div>
            )
        } else {
            return (
                <div>
                    <button style={{ marginRight: 4 }} class="btn-sm btn-danger" onClick={() => this.decline()}>{this.state.decline}</button>
                    <button style={{ marginRight: 4 }} class="btn-sm btn-success" onClick={() => this.approve()}>{this.state.approve}</button>
                    <button className="btn-sm btn-info" onClick={() => this.requestModifcation()}>Request Modification</button>
                </div>
            )
        }
    }


    render() {

        return (
            <div className="feed-item">
                <img src={this.props.notification.swaper_profile_image} alt="user" className="img-responsive profile-photo-sm" />
                <div className="live-activity">
                    <p><a href="#" className="profile-link">{this.props.notification.swaper_name}</a> wants to swap a status with you.
                    <p>
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate }, () => {
                                    console.log(startDate + " : " + endDate)
                                })} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />

                        </p>

                    </p>
                    <p>

                        <span>
                            {this.isModificationrequestedAndByWhom()}
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