import { ChatFeed, Message } from 'react-chat-ui'
import React from "react";
import PropTypes from 'prop-types';
import StyleSheet from 'react';
import '../../chat.css';
import {
  Link
} from "react-router-dom";
import SenderChatMessage from './SenderChatMessage';
import RecieverChatMessage from './RecieverChatMessage';
import Connection from '../Connection';
export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: null, isLoading: true, newMessage: '', chatWith: '', chatWithUser: [] };
  }

  static = {
    id: PropTypes.number
  }

  async componentDidMount() {
    var url = Connection.getBaseUrl() + "msg/get?token=" + Connection.getToken() + "&id=" + this.props.id;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.isFound) {
          console.log(res.messages);
          this.setState({
            messages: res.messages,
            chatWith: res.messages[0].amISender ? res.messages[0].rec_name : res.messages[0].sender_name

          }, () => {
            this.scrollToBottom();
          })
        } else {
          //start chat first.....
          var url = Connection.getBaseUrl() + "participants/initiate?id=" + this.props.id + "&token=" + Connection.getToken();
          fetch(url)
            .then(res => res.json())
            .then(res => {
              if (res.isInitiated) {
                this.setState({
                  chatWith: res.user_to_chat_with.name,
                  chatWithUser: res.user_to_chat_with
                })
              } else {
                alert(res.message);
              }
            })
        }
      })
  }

  renderMessages = () => {
    if (this.state.messages != null) {
      var mViews = this.state.messages.map((e, i) => {
        if (e.amISender == 1) {
          return <SenderChatMessage key={i} message={e} />
        } else {
          return <RecieverChatMessage key={i} message={e} />
        }
      });
      return mViews;
    } else {
      return '';
    }
  }

  setToState = () => {
    this.setState({
      messages: this.props.messages
    });
  }

  sendMessage = () => {
    var url = Connection.getBaseUrl() + "msg/send?token=" + Connection.getToken() + "&msg=" + this.state.newMessage;

    if (this.state.messages == null) {
      url = url + "&id=" + this.state.chatWithUser.user_id;

    } else {
      if (this.state.messages[0].amIUserOne == 1) {
        url = url + "&id=" + this.state.messages[0].user_two;
      } else {
        url = url + "&id=" + this.state.messages[0].user_one;
      }
    }
    // 

    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.isError) {
          alert(res.message);
        } else if (res.isSent) {
          var msgs = [];
          if (this.state.messages != null) {
            var msgs = this.state.messages;
          }


          msgs.push(res.s_message);
          this.setState({
            newMessage: '',
            messages: msgs,

          }, () => {
            //  console.log("msg lenght: "+this.state.messages.length);
            this.scrollToBottom();

          });
          //  alert(res.message);

        }
      })
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  returnUserTwoName = () => {
    if (this.state.messages[0].amIUserOne == 1) {
      return this.state.messages[0].rec_name;
    } else {
      return this.state.messages[0].sender_name;
    }
  }

  render() {
    return (
      <div className="container bootstrap snippets">
        <div className="col-md-12 col-xs-12">
          {/* Panel Chat */}
          <div className="panel" id="chat" >
            <div className="panel-heading">
              <h3 className="panel-title">
                <i className="icon wb-chat-text" aria-hidden="true" /> Chatting with <b>{this.state.chatWith}</b>
              </h3>
            </div>
            <div className="panel-body" style={{ height: '500px', 'overflow-y': 'scroll' }}>
              <div className="chats">
                {this.renderMessages()}
                <div style={{ float: "left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <form>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Say something" value={this.state.newMessage} onChange={(text) => {
                    this.setState({
                      newMessage: text.target.value
                    })
                  }} />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={() => this.sendMessage()}>Send</button>
                  </span>
                </div>
              </form>
            </div>
          </div>
          {/* End Panel Chat */}
        </div>
      </div>
    );
  }
}

