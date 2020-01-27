import React from "react";
export default class Sidebar extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    // static = {
    //         callBack: PropTypes.func
    // }

    render(){
        return(
            <div className="col-md-3 static" id="hideonmobile">
            <div className="profile-card">
              <img src="images/users/user-1.jpg" alt="user" className="profile-photo" />
              <h5><a href="timeline.html" className="text-white">Sarah Cruiz</a></h5>
              <a href="#" className="text-white"><i className="ion ion-android-person-add" /> 1,299 followers</a>
            </div>{/*profile card ends*/}
            <ul className="nav-news-feed">
              <li><i className="icon ion-ios-paper" /><div><a href="newsfeed.html">My Newsfeed</a></div></li>
              <li><i className="icon ion-ios-people" /><div><a href="newsfeed-people-nearby.html">People Nearby</a></div></li>
              <li><i className="icon ion-ios-people-outline" /><div><a href="newsfeed-friends.html">Friends</a></div></li>
              <li><i className="icon ion-chatboxes" /><div><a href="newsfeed-messages.html">Messages</a></div></li>
              <li><i className="icon ion-images" /><div><a href="newsfeed-images.html">Images</a></div></li>
              <li><i className="icon ion-ios-videocam" /><div><a href="newsfeed-videos.html">Videos</a></div></li>
            </ul>{/*news-feed links ends*/}
            <div id="chat-block">
              <div className="title">Chat online</div>
              <ul className="online-users list-inline">
                <li><a href="newsfeed-messages.html" title="Linda Lohan"><img src="images/users/user-2.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="Sophia Lee"><img src="images/users/user-3.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="John Doe"><img src="images/users/user-4.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="Alexis Clark"><img src="images/users/user-5.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="James Carter"><img src="images/users/user-6.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="Robert Cook"><img src="images/users/user-7.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="Richard Bell"><img src="images/users/user-8.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="Anna Young"><img src="images/users/user-9.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
                <li><a href="newsfeed-messages.html" title="Julia Cox"><img src="images/users/user-10.jpg" alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></a></li>
              </ul>
            </div>{/*chat block ends*/}
          </div>
        )
    }
}