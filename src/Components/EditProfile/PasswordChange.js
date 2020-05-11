import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Connection from '../Connection';
// import Connection from '../../Connection.js';
export default class PasswordChange extends React.Component {
    static = {
        stats: PropTypes.object
    }

    state = {
        oldpass: null,
        newpass: null,
        confirmpass: null,
    }

    componentDidMount() {

    }

    changePassword() {
        var url = Connection.getBaseUrl() + "profile/changepassword?token=" + Connection.getToken() +
            '&oldpass=' + this.state.oldpass + '&newpass=' + this.state.newpass + '&confirmpass=' + this.state.confirmpass;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError) {
                    alert(res.message);
                } else {
                    alert(res.message);
                }
            })
    }


    render() {
        return (
            <div style={{ paddingBottom: '40px' }}>
                <h3>Change Password</h3>
                <div className="form-group">
                    <label for="current_password">Current Password</label>
                    <input type="password" value={this.state.oldpass} onChange={(text) => {
                        this.setState({ oldpass: text.target.value })
                    }} className="form-control" id="current_password" placeholder="Current Password" />
                </div>
                <div className="form-group">
                    <label for="new_password">New Password</label>
                    <input type="password" value={this.state.newpass} onChange={(text) => {
                        this.setState({ newpass: text.target.value })
                    }} className="form-control" id="new_password" placeholder="New Password" />
                </div>

                <div className="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <input type="password" value={this.state.confirmpass} onChange={(text) => {
                        this.setState({ confirmpass: text.target.value })
                    }} className="form-control" id="confirm_password" placeholder="Confirm Password" />
                </div>

                <button onClick={() => this.changePassword()} className="btn btn-primary pull-right">Change Password</button>
            </div>
        );
    }
}