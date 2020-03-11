import React from "react";
import PropTypes from 'prop-types';
import {
  Link
} from "react-router-dom";
export default class Cover extends React.Component {

  state = {
    statuses: 'active',
    swaps: '',

  }
  static = {
    tab: PropTypes.func
  }

  switchTab = (t) => {
    if(t == 'statuses'){
      this.setState({
        statuses: 'active',
        swaps: '',
      },() => {
        this.props.tab(t);
      })
    }else {
      this.setState({
        statuses: '',
        swaps: 'active',
      },() => {
        this.props.tab(t);
      })
    }
  }
    render(){
        return(
            <div className="timeline-cover">
            {/*Timeline Menu for Large Screens*/}
            <div className="timeline-nav-bar hidden-sm hidden-xs">
              <div className="row">
                <div className="col-md-3">
                  <div className="profile-info">
                    
                    <img src="images/users/user-1.jpg" alt="" className="img-responsive profile-photo" />
                    {/* <p className="text-muted">Creative Director</p> */}
                  </div>
                </div>
                <div className="col-md-9">
                <h3>Sarah Cruiz</h3>

                  <ul className="list-inline profile-menu">
                    <li><Link onClick={() => this.switchTab('statuses')} className={this.state.statuses}>Statuses</Link></li>
                    <li><Link onClick={() => this.switchTab('swaps')} className={this.state.swaps}>Swaps</Link></li>
                    {/* <li><a href="timeline-album.html">Album</a></li>
                    <li><a href="timeline-friends.html">Friends</a></li> */}
                  </ul>
                  <ul className="follow-me list-inline">
                    <li>1,299 people following her</li>
                    <li><button className="btn-primary">Follow</button></li>
                  </ul>
                </div>
              </div>
            </div>{/*Timeline Menu for Large Screens End*/}
            {/*Timeline Menu for Small Screens*/}
            <div className="row">
            <div className="navbar-mobile hidden-lg hidden-md" style={{position:'initial'}}>
              <div className="profile-info">
                <img src="images/users/user-1.jpg" alt="" className="img-responsive profile-photo" style={{width:'40%',height:'10%'}} />
              </div>
              <div className="mobile-menu">
              <h4>Sarah Cruiz</h4>

                <ul className="list-inline">
                  <li><Link style={{color:'white'}} onClick={() => this.switchTab('statuses')} className={this.state.statuses}>Statuses</Link></li>
                  <li><Link style={{color:'white'}} onClick={() => this.switchTab('swaps')} className={this.state.swaps}>Swaps</Link></li>
                  {/* <li><a href="timeline-album.html">Album</a></li>
                  <li><a href="timeline-friends.html">Friends</a></li> */}
                </ul>
                <button className="btn-primary">Follow</button>
              </div>
            </div>{/*Timeline Menu for Small Screens End*/}

            </div>

          </div>
        );
    }
}