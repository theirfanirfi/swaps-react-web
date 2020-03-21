import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Connection from '../../Connection.js';
export default class StatusSwapedOrShared extends React.Component {
    static = {
        status: PropTypes.object
    }

    state = {
        stars: 0
    }

    componentDidMount(){
        // this.setState({
        //     stars: this.props.status.ratting
        // })
    }

    rateStatus(){
        var token = Connection.getToken();
        var url = Connection.getBaseUrl();
        url += "status/rateStatus?status_id="+this.props.status.status_id+"&rating="+this.state.stars+"&token="+token;
        // var url = "http://192.168.10.6/swap/public/api/status/rateStatus?status_id="+this.props.status.status_id+"&rating="+this.state.stars+"&token="+token;
            fetch(url)
            .then(res => res.json())
            .then((res) => {
              if(res.isRated){
                  console.log(res.rating);
                  this.setState({
                      stars: res.rating,
                  })
              }
            })
    }

    renderSwap(){
        if(this.props.status.isMe){
        return <p>You swaped with <i style={{fontWeight:'bold'}}>{this.props.status.swaped_with_user_name}</i></p>;
        }else {
            return <p><i style={{fontWeight:'bold'}}>{this.props.status.poster_user_name}</i> with you</p>;
        }
    }

    render(){
        return(
            <div>
                {this.renderSwap()}
            </div>
        );
    }
}