import React from "react";
import Connection from "../Connection";
import WhoToFollowRow from "./WhoToFollowRow";
export default class WhoToFollow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users_to_follow: '', users: [] };
  }

  async componentDidMount() {
    var url = Connection.getBaseUrl() + "followers/startFollowing?token=" + Connection.getToken();
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        // console.log(res.users);
        this.setState({
          users: res.users
        }, () => {
          let u = this.state.users;
          var users = u.map((user, index) => {
            return <WhoToFollowRow user={user} />
          })

          this.setState({
            users_to_follow: users
          })

        })
      })
  }
  // static = {
  //         callBack: PropTypes.func
  // }

  render() {
    return (
      <div className="col-md-2 static">
        <div className="suggestions" id="sticky-sidebar">
          <h4 className="grey">Who to Follow</h4>
          {this.state.users_to_follow}
        </div>
      </div>
    )
  }
}