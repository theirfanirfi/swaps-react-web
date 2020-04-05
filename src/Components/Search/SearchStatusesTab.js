import React from "react";
import SingleStatus from "../Shared/SingleStatus";
import Connection from '../Connection.js';
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from 'prop-types';
export default class SearchStatusesTab extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    state = {
      statuses: [],
      loading: true,
    }
    static = {
        search: PropTypes.string
    }


     async componentDidMount(){
      var token = Connection.getToken();
      var url = Connection.getBaseUrl();
      url += "search/statusr?token="+token+"&search="+this.props.search;
      // var url = 'http://192.168.10.6/swap/public/api/status/getStatuses?token='+token;
      fetch(url)
      .then(res => res.json())
      .then(text => {
        if(text.isAuthenticated){
          if(text.isFound){
            this.setState({
              statuses: text.statuses,
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

    renderStatuses(statuses) {
     
     if(this.state.statuses){
      var comp = statuses.map((status, i) => {     
         // console.log("Entered");                 
          // Return the element. Also pass key     
          return <SingleStatus key={i} status={status} />
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

           {this.renderStatuses(this.state.statuses)}
         </div>
        )
    }
}