import React from 'react';
import PropTypes from 'prop-types';
import Connection from '../../Connection';
export default class PostComment extends React.Component {
    static = {
        status: PropTypes.object,
        callMeAfterComment: PropTypes.func
    }

    state = {
        commentBox: ''
    }
    postComment(){
        var token = 'JDJ5JDEwJFdGdW14bmpZUTEvMVIuNmtLT1FJQXU5Lllva28weGJibXgyVloyMjM3M0kveEFGbEkueGtt';
        var url = Connection.getBaseUrl();
        url += "commentons?status_id="+this.props.status.status_id+"&comment="+this.state.commentBox+"&token="+token;
        // var url = "http://192.168.10.3/swap/public/api/commentons?status_id="+this.props.status.status_id+"&comment="+this.state.commentBox+"&token="+token;
        
        if(this.state.commentBox.length > 0){
            fetch(url)
            .then(res => res.json())
            .then((res) => {
              if(res.isCommented){
                  console.log(res.comment);
                  this.props.callMeAfterComment(res.comment);
                  this.setState({
                      commentBox: '',
                  })
              }

                // {isError: false, isAuthenticated: true, isCommented: false, isAlreadyCommented:
                //      true, message: "You have already commented on the status with the same text."}
            })
          }
    }
    render(){
        return(
        <div>
            <div className="post-comment">
                    <img src="images/users/user-1.jpg" alt="" className="profile-photo-sm" />
                    <input type="text" onChange={(text) => this.setState({commentBox: text.target.value})}  className="form-control" placeholder="Post a comment" value={this.state.commentBox} />
                    <button onClick={() => this.postComment()} className="btn btn-primary">Post</button>
                  </div>
        </div>
        );
    }
}


