import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Connection from '../../Connection.js';
export default class RatingBar extends React.Component {
    static = {
        status: PropTypes.object
    }

    state = {
        stars: 0
    }

    componentDidMount(){
        this.setState({
            stars: this.props.status.ratting == null ? this.props.status.avg_ratting : this.props.status.ratting
        })
    }

    rateStatus(){
        var token = 'JDJ5JDEwJFdGdW14bmpZUTEvMVIuNmtLT1FJQXU5Lllva28weGJibXgyVloyMjM3M0kveEFGbEkueGtt';
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


    render(){
        return(
            <Rating onChange={(rate) => {
                this.setState({
                    stars: rate
                },() => {
                    this.rateStatus()
                })
            }}
            placeholderRating={this.state.stars}
            style={{fontSize: '16px'}} 
            placeholderSymbol={<icon className="fa fa-star" style={{margin: '4px',color:'#B401FF'}}  />}
            fullSymbol={<icon className="fa fa-star" style={{margin: '4px',}}  />} 
            emptySymbol={<icon style={{margin: '4px',}} className="fa fa-star" />} />
        );
    }
}