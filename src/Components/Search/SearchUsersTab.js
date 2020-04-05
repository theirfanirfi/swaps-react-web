import React from "react";
import SingleStatus from "../Shared/SingleStatus";
import Connection from '../Connection.js';
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';
import SearchSingleUserRow from "./SearchSingleUserRow";
export default class SearchUsersTab extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    state = {
      users: [],
      loading: true,
    }
    static = {
        search: PropTypes.string
    }


     async componentDidMount(){
      var token = Connection.getToken();
      var url = Connection.getBaseUrl();
      url += "search/usersr?token="+token+"&search="+this.props.search;
      // var url = 'http://192.168.10.6/swap/public/api/status/getStatuses?token='+token;
      fetch(url)
      .then(res => res.json())
      .then(text => {
        if(text.isAuthenticated){
          if(text.isFound){
            this.setState({
              users: text.users,
              loading: false,
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

    renderUsers(users) {
     
     if(this.state.users){
      var comp = users.map((user, i) => {     
         // console.log("Entered");                 
          // Return the element. Also pass key     
          return <SearchSingleUserRow key={i} user={user} />
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

           {this.renderUsers(this.state.users)}
         </div>
        )
    }
}