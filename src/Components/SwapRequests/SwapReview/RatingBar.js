import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import Connection from '../../Connection.js';
export default class RatingBar extends React.Component {
    static = {
        callBack: PropTypes.func
    }

    state = {
        stars: 0
    }

    componentDidMount(){
        // this.setState({
        //     stars: this.props.status.ratting == null ? this.props.status.avg_ratting : this.props.status.ratting
        // })
    }

    rateStatus(){
        this.props.callBack(this.state.stars);
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
            style={{fontSize: '26px'}} 
            placeholderSymbol={<icon className="fa fa-star" style={{margin: '4px',color:'#B401FF'}}  />}
            fullSymbol={<icon className="fa fa-star" style={{margin: '4px',}}  />} 
            emptySymbol={<icon style={{margin: '4px',}} className="fa fa-star" />} />
        );
    }
}