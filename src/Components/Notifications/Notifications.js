import React from "react";
import Connection from '../Connection.js';
import NotificationRow from './NotificationRow.js';
export default class Notifications extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    state = {
      notifications: []
    }

    status = {
      username: 'Irfan Ullah',
      published: '02:42 am',
      status: 'this is my status',
    }

     async componentDidMount(){
      var token = 'JDJ5JDEwJFdGdW14bmpZUTEvMVIuNmtLT1FJQXU5Lllva28weGJibXgyVloyMjM3M0kveEFGbEkueGtt';
      var url = Connection.getBaseUrl();
      url += 'notifications/getNotificationsrw?token='+token;
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
          return <NotificationRow key={i} notification={notification} />
       })
       return comp;
      }

     
    }

    render(){

        return(
          //  <SingleStatus statuses={this.state.statuses}/>
         <div>
           {this.renderStatuses(this.state.notifications)}
         </div>
        )
    }
}