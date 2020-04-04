import React from "react";
import '../../chat.css';
import PropTypes from 'prop-types';

export default class RecieverChatMessage extends React.Component {

	constructor(props) {
        super(props);
    }
    static = {
        message: PropTypes.object,
    }

	render(){
        return (
                  <div className="chat chat-left">
                    <div className="chat-avatar">
                      <a className="avatar avatar-online" data-toggle="tooltip" href="#" data-placement="left" title data-original-title={this.props.message.rec_name} >
                        <img src={this.props.message.rec_profile_image} alt="..." />
                        <i />
                      </a>
                    </div>
                    <div className="chat-body">
                      <div className="chat-content">
                      <p>{this.props.message.message}</p>
                        <time className="chat-time" dateTime="2015-07-01T11:39">{this.props.message.created_at} </time>
                      </div>
                    </div>
                  </div>
        );
    }
}