import React from "react";

import PropTypes from 'prop-types';
import Connection from '../Connection.js';


export default class FollowedUserListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var url = Connection.getBaseUrl() + 'followers/getfollowedusers?token=' + Connection.getToken();

        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError || !res.isAuthenticated) {
                    alert(res.message)
                } else if (res.isFound) {
                    console.log(res.followed);
                } else {
                    alert(res.message);
                }
            })
    }

    static = {
        logged_in_user_id: PropTypes.number
    }

    state = {
        followed_users: []
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}