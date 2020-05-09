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
export default class SwapedWithUserRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = { swapBtn: 'Swap' };
    }

    static = {
        user: PropTypes.object,
    }

    componentDidMount() {
    }



    render() {

        return (
            <div className="post-content">
                <a to={"/profile/" + this.props.user.user_id} style={{ textDecoration: 'none' }}>
                    <ToastContainer enableMultiContainer containerId={'B'} autoClose={1500} position={toast.POSITION.TOP_CENTER} />
                    {/* <img src="images/post-images/1.jpg" alt="post-image" className="img-responsive post-image" /> */}
                    <div className="post-container">
                        <img src={this.props.user.profile_image} alt="user" className="profile-photo-md pull-left" />
                        <div className="post-detail">
                            <div className="user-info">
                                <h5><Link to={"/profile/" + this.props.user.user_id} className="profile-link">{this.props.user.name}</Link></h5>
                                <p className="text-muted"><b>Member since: </b>{this.props.user.created_at}</p>
                            </div>

                            <div className="line-divider" />
                            <div className="">
                                <a className="btn btn-primary">{this.state.swapBtn}</a>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}