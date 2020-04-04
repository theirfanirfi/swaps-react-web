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
        this.state = {messages: [],isLoading: true,newMessage: '',chatWith: ''};
    }

    static = {
      id: PropTypes.number
    }

    componentDidMount(){
      var url = Connection.getBaseUrl()+"msg/get?token="+Connection.getToken()+"&id="+this.props.id;
      fetch(url)
      .then(res => res.json())
      .then(res => {
        if(res.isFound){
          this.setState({
            messages: res.messages,
            chatWith: res.messages[0].amISender ? res.messages[0].rec_name : res.messages[0].sender_name

          },() => {
            //console.log(this.state.messages);
          })
        }
      })
      }

    renderMessages = () => {
      var mViews = this.state.messages.map((e,i) => {
        if(e.amISender == 1){
        return <SenderChatMessage key={i} message={e} />
        }else {
          return <RecieverChatMessage key={i} message={e} />
        }
      });
      return mViews;
    }

    setToState = () => {
      this.setState({
        messages: this.props.messages
      });
    }

    sendMessage = () => {
      var url = Connection.getBaseUrl()+"msg/send?token="+Connection.getToken()+"&msg="+this.state.newMessage;
      if(this.state.messages[0].amIUserOne == 1){
        url = url +"&id="+this.state.messages[0].user_two;
      }else {
        url = url +"&id="+this.state.messages[0].user_one;
      }
     // 

     fetch(url)
     .then(res => res.json())
     .then(res => {
       if(res.isError){
         alert(res.message);
       }else if(res.isSent){
         var msgs = this.state.messages;
         console.log("msg lenght: "+msgs.length);
         msgs.push(res.s_message);
         this.setState({
           newMessage: '',
           messages: msgs,

         },() => {
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
      if(this.state.messages[0].amIUserOne == 1){
        return this.state.messages[0].rec_name;
      }else {
        return this.state.messages[0].sender_name;
      }
    }

    render(){
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
              <div className="panel-body" style={{height:'500px','overflow-y':'scroll'}}>
                <div className="chats">
                  {this.renderMessages()}
                  <div style={{ float:"left", clear: "both" }}
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

