import React from "react";
import Connection from "../Connection";
import PropType from 'prop-types';
export default class WhoToFollowRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { followed_unfollowed: 'Follow', users: [] };
    }

    static = {
        user: PropType.object
    }

    // async componentDidMount() {
    //     this.setState({
    //         followed_unfollowed: this.props.us
    //     })
    // }
    async followUser() {
        var url = Connection.getBaseUrl() + "followers/follow?token=" + Connection.getToken() +
            '&id=' + this.props.user.user_id;
        await fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError) {
                    alert(res.message);
                } else if (res.isFollowed) {
                    this.setState({
                        followed_unfollowed: 'unfollow'
                    })
                } else {
                    alert(res.message);
                }
            })
    }

    render() {
        return (
            <div className="follow-user">
                <img src={Connection.getProfileImageForUsers(this.props.user.profile_image)} alt="" className="profile-photo-sm pull-left" />
                <div>
                    <h5><a href="">{this.props.user.name}</a></h5>
                    <button onClick={() => this.followUser()} className="btn btn-primary">{this.state.followed_unfollowed}</button>
                </div>
            </div>
        )
    }
}