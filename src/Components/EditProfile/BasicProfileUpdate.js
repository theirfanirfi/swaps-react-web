import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Connection from '../Connection.js';
export default class BasicProfileUpdate extends React.Component {
    static = {
        user: PropTypes.object
    }

    state = {
        fullname: null,
        email: null,
        profile_description: null,
        user: [],
        description_length: 200
    }

    componentDidMount() {
        var url = Connection.getBaseUrl() + "profile/getprofiledetails?token=" + Connection.getToken();
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isFound) {
                    this.setState({
                        user: res.profile,
                        fullname: res.profile.name,
                        email: res.profile.email,
                        profile_description: res.profile.profile_description,
                        description_length: this.state.description_length - res.profile.profile_description.length
                    })
                } else {
                    alert(res.message);
                }
            })
    }

    getFullname() {
        if (this.state.fullname == null) {
            return this.props.user.name
        } else {
            return this.state.fullname
        }
    }

    updateProfileBasicDetails() {
        var url = Connection.getBaseUrl() + "profile/updateprofile?token=" + Connection.getToken() +
            "&name=" + this.state.fullname + "&email=" + this.state.email + "&description=" + this.state.profile_description;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                alert(res.message);
            })
    }


    render() {
        return (
            <div style={{ paddingBottom: '40px' }}>
                <div className="form-group">
                    <label for="description">Profile Description</label>
                    <textarea className="form-control" maxLength="200" value={this.state.profile_description} placeholder="Profile Description" onChange={(text) => {
                        this.setState({ profile_description: text.target.value })
                    }}></textarea>
                    <p className="pull-right">Max Length: 200</p>
                </div>

                <div className="form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname" onChange={(text) => {
                        this.setState({ fullname: text.target.value })
                    }} value={this.state.fullname} placeholder="Full Name" />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" onChange={(text) => {
                        this.setState({ email: text.target.value })
                    }} value={this.state.email} placeholder="Email" />
                </div>
                <button onClick={() => this.updateProfileBasicDetails()} className="btn btn-primary pull-right">Update</button>
            </div>
        );
    }
}