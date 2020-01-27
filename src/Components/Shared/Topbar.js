import React from "react";
// import "../../assets/css/bootstrap.min.css";
// import "../../assets/css/style.css";
// import "../../assets/css/ionicons.min.css";
// import "../../assets/css/font-awesome.min.css";
import PropTypes from 'prop-types';

export default class Topbar extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    static = {
            callBack: PropTypes.func
    }

tabClicked = tab => {
this.props.callBack(tab);
}
    render(){
     

        return (

      <header id="header">

      <nav className="navbar navbar-default navbar-fixed-top menu" style={{backgroundColor: 'white',borderBottomWidth: '4',borderBottomColor:'#B401FF'}}>
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">

           </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div >
            <ul id="swaptopmenu">
              <li>
              <img style={{width:'50px'}} src="images/app_logo.png" alt="logo" />
              </li>
              <li  ><a href="#" onClick={() => this.tabClicked('home')} style={{fontSize: '18px',color:'#B401FF'}}>Home</a></li>
              <li ><a href="#" onClick={() => this.tabClicked('swaps')} style={{fontSize: '18px',color:'#B401FF'}}>Swaps</a></li>
              <li ><a href="#" onClick={() => this.tabClicked('browse')} style={{fontSize: '18px',color:'#B401FF'}}>Browse</a></li>
<li className="hidden-sm">
<form className="navbar-form navbar-right ">
              <div className="form-group">
                <i className="icon ion-android-search" />
                <input style={{borderColor: '#B401FF',borderWidth:'2',color:'#B401FF'}} type="number" className="form-control" placeholder="Search friends, photos, videos" />
              </div>
            </form>
</li>
            </ul>
          
        
       
          </div>{/* /.navbar-collapse */}
        </div>{/* /.container */}
      </nav>
    </header>

        );
    }

}