import React from "react";

import PropTypes from 'prop-types';
import Connection from '../Connection.js';
import Comments from "../Shared/Comment/Comments.js";

export default class SingleStatusComments extends React.Component {

    static = {
        status: PropTypes.object
    }
    state = {
        loading: true,
        commentBlock: ''
    }
     componentDidMount(){
      // alert(this.props.status.status_id);
        var token = Connection.getToken();
        var url = Connection.getBaseUrl();
        url += "getcomments?status_id="+this.props.status_id+"&token="+token;
        // var url = "http://192.168.10.3/swap/public/api/getcomments?status_id="+status_id+"&token="+token;
          fetch(url)
          .then(res => res.json())
          .then((res) => {
            if(res.isFound){
            var comments = res.comments;
            console.log("comments: "+comments);
            var comblockk = comments.map((comment,i) => {
              return <Comments comment={comment} key={i} />
            });
      
            this.setState({commentBlock: comblockk});
            }
          })
    }

    render(){
        return(
            <div>
            {this.state.commentBlock}
            </div>
    )
    }
}