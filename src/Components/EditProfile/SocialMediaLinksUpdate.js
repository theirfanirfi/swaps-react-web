import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Connection from '../Connection';
// import Connection from '../../Connection.js';
export default class SocialMediaLinksUpdate extends React.Component {
    static = {
        stats: PropTypes.object
    }

    state = {
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null,
    }

    componentDidMount() {
        var url = Connection.getBaseUrl() + "profile/getprofilesmlinks?token=" + Connection.getToken();
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isFound) {
                    this.setState({
                        facebook: res.profile.fb_profile_link,
                        twitter: res.profile.twitter_profile_link,
                        instagram: res.profile.insta_profile_link,
                        linkedin: res.profile.linkedin_profile_link,
                    })
                } else {
                    alert(res.message);
                }
            })

    }

    updateSMLinks() {
        var url = Connection.getBaseUrl() + "profile/updatesml?token=" + Connection.getToken() +
            '&fb=' + this.state.facebook + '&tw=' + this.state.twitter + '&insta=' + this.state.instagram + '&ln=' + this.state.linkedin;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError) {
                    alert(res.message)
                } else {
                    alert(res.message);
                }
            })

    }


    render() {
        return (
            <div style={{ paddingBottom: '40px' }}>
                <h3>Social Media Profile Links</h3>
                <div className="form-group">
                    <label for="facebook">Facebook profile link</label>
                    <input type="url" value={this.state.facebook} className="form-control" onChange={(text) => {
                        this.setState({
                            facebook: text.target.value
                        })
                    }} id="facebook" placeholder="Facebook profile link" />
                </div>

                <div className="form-group">
                    <label for="Twitter">Twitter profile link</label>
                    <input type="url" value={this.state.twitter} className="form-control" onChange={(text) => { this.setState({ twitter: text.target.value }) }} id="twitter" placeholder="Twitter profile link" />
                </div>

                <div className="form-group">
                    <label for="instagram">Instagram profile link</label>
                    <input type="url" onChange={(text) => { this.setState({ instagram: text.target.value }) }} value={this.state.instagram} className="form-control" id="instagram" placeholder="Instagram profile link" />
                </div>

                <div className="form-group">
                    <label for="ln">Linkedin profile link</label>
                    <input type="url" onChange={(text) => { this.setState({ linkedin: text.target.value }) }} value={this.state.linkedin} className="form-control" id="ln" placeholder="Linkedin profile link" />
                </div>
                <button onClick={() => this.updateSMLinks()} className="btn btn-primary pull-right">Submit</button>
            </div >
        );
    }
}