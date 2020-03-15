import React from "react";
import Connection from '../Connection.js';
import NotificationRow from './NotificationRow.js';
import ClipLoader from "react-spinners/ClipLoader";
export default class Notifications extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    state = {
      notifications: [],
      loading: true,
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
            });
          }else {
            this.setState({
              loading: false
            })
          }
        }else {
          this.setState({
            loading: false
          })
        }
      })
    }

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
                                 			<div style={{width:'100%',padding:'8px',display: 'flex',  justifyContent:'center', alignItems:'center',}}>
			<ClipLoader
          size={20}
          color={"#123abc"}
          loading={this.state.loading}
        />
		</div>
           {this.renderStatuses(this.state.notifications)}
         </div>
        )
    }
}