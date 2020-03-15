import React from "react";
import Connection from '../../Connection.js';
import RequestRow from './RequestRow';
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
      var token = Connection.getToken();
      var url = Connection.getBaseUrl();
      url += 'notifications/getSwapRequestNotifications?token='+token;
      fetch(url)
      .then(res => res.json())
      .then(text => {
        if(text.isAuthenticated){
          if(text.isFound){
            this.setState({
              notifications: text.notifications,
              loading: false
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
          return <RequestRow key={i} notification={notification} />
       })
       return comp;
      }

     
    }

    render(){

        return(
          //  <SingleStatus statuses={this.state.statuses}/>
         <div style={{padding: 12}}>
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