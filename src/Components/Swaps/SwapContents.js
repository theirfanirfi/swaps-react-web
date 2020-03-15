import React from "react";
import Connection from '../Connection.js';
import SingleSwapStatus from './SingleSwapStatus.js';
export default class SwapContents extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    state = {
      statuses: []
    }

    status = {
      username: 'Irfan Ullah',
      published: '02:42 am',
      status: 'this is my status',
    }

     async componentDidMount(){
      var token = 'JDJ5JDEwJFdGdW14bmpZUTEvMVIuNmtLT1FJQXU5Lllva28weGJibXgyVloyMjM3M0kveEFGbEkueGtt';
      var url = Connection.getBaseUrl();
      url += 'swaps?token='+token;
      fetch(url)
      .then(res => res.json())
      .then(text => {
        if(text.isAuthenticated){
          if(text.isFound){
            this.setState({
              statuses: text.swaps
            }
            
            // ,() => {
            //                console.log(this.state.statuses);

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

    renderStatuses(statuses) {
     
     if(this.state.statuses){
      var comp = statuses.map((status, i) => {     
         // console.log("Entered");                 
          // Return the element. Also pass key     
          return <SingleSwapStatus key={i} status={status} />
       })
       return comp;
      }

     
    }

    render(){

        return(
          //  <SingleStatus statuses={this.state.statuses}/>
         <div>
           {this.renderStatuses(this.state.statuses)}
         </div>
        )
    }
}