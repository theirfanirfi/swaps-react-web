import React from "react";
import Connection from '../../Connection.js';
import RequestRow from './RequestRow';
export default class Notifications extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    state = {
      notifications: []
    }


     async componentDidMount(){
      var token = Connection.getToken();
      var url = Connection.getBaseUrl();
      url += 'notifications/getSwapRequestNotifications?token='+token;
      fetch(url)
      .then(res => res.json())
      .then(text => {
        if(text.isAuthenticated){
          if(text.isFound){
            this.setState({
              notifications: text.notifications
            }
            
            // ,() => {
            //                console.log(this.state.notifications);

            // }
            
            );
          }
        }
      })
      // .then(response => {
      //   console.log(response);
      // });
    }
    // static = {
    //         callBack: PropTypes.func
    // }

    renderStatuses(notifications) {
     
     if(this.state.notifications){
      var comp = notifications.map((notification, i) => {     
         // console.log("Entered");                 
          // Return the element. Also pass key     
          return <RequestRow key={i} notification={notification} />
       })
       return comp;
      }

     
    }

    render(){

        return(
          //  <SingleStatus statuses={this.state.statuses}/>
         <div style={{padding: 12}}>
           {this.renderStatuses(this.state.notifications)}
         </div>
        )
    }
}