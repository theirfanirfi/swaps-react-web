import React from "react";

import PropTypes from 'prop-types';
import Connection from '../Connection.js';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link
} from "react-router-dom";

export default class FollowedUserListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        followed_users: [],
        users: [],
        swapBtn: 'Swap'
    }

    async componentDidMount() {
        var url = Connection.getBaseUrl() + 'followers/getfollowedusers?token=' + Connection.getToken();

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError || !res.isAuthenticated) {
                    alert(res.message)
                } else if (res.isFound) {
                    this.setState({
                        users: res.followed,
                    })
                } else {
                    alert(res.message);
                }
            })
    }

    static = {
        callBack: PropTypes.func
    }

    sendBackUserId = user_id => {
        this.props.callBack(user_id);
    }


    renderUsers() {
        return this.state.users.map((u, i) => {
            return (
                <div className="post-content">
                    <div style={{ textDecoration: 'none' }}>
                        <ToastContainer enableMultiContainer containerId={'B'} autoClose={1500} position={toast.POSITION.TOP_CENTER} />
                        {/* <img src="images/post-images/1.jpg" alt="post-image" className="img-responsive post-image" /> */}
                        <div className="post-container">
                            <img src={u.profile_image} alt="user" className="profile-photo-md pull-left" />
                            <div className="post-detail">
                                <div className="user-info">
                                    <h5><a className="profile-link">{u.name}</a></h5>
                                </div>

                                <div className="line-divider" />
                                <div className="">
                                    <a onClick={() => this.sendBackUserId(u.user_id)} className="btn-sm btn-primary">{this.state.swapBtn}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderUsers()}
            </div>
        )
    }
}