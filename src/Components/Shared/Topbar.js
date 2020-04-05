import React from "react";
import {
  Link,
  withRouter
} from "react-router-dom";
import TopBarChatList from  '../Chat/TopBarChatList.js';
import Connection from "../Connection.js";
import TopbarChatList from "../Chat/TopBarChatList.js";

 class Topbar extends React.Component {
	constructor(props) {
        super(props);
        this.state = {value: '',participants: [],searchValue: ''};
    }

    goOnSearch = () => {
     // let history = useHistory();
      let path = "/search/"+this.state.searchValue;
      this.props.history.push(path);
    }
    async componentDidMount(){
      var url = Connection.getBaseUrl()+"participants?token="+Connection.getToken();
      fetch(url)
      .then(response => response.json())
      .then(res => {
       if(res.isAuthenticated){
         if(res.isFound){
           var par = res.participants;
           var mapedParticipants = par.map((e,i) => {
             return <TopbarChatList message={e} />
           });

           this.setState({
             participants: mapedParticipants
           });
         }
       }
      });
    }

    render(){
     

        return (

      <header id="header">

      <nav className="timeline-nav-bar hidden-sm hidden-xs navbar navbar-default navbar-fixed-top menu" style={{backgroundColor: 'white',borderBottomWidth: '4',borderBottomColor:'#B401FF'}}>
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">

           </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div >
            <ul id="swaptopmenu">
              <li>
              <img style={{width:'50px'}} src={process.env.PUBLIC_URL+"/images/app_logo.png"} alt="logo" />
              </li>
              {/* <li  ><a href="#" onClick={() => this.tabClicked('home')} style={{fontSize: '18px',color:'#B401FF'}}>Home</a></li> */}
              <li  ><Link to="/home" style={{fontSize: '20px',color:'#B401FF'}}>Home</Link></li>
              <li ><Link to="/swaps"  style={{fontSize: '18px',color:'#B401FF'}}>Swaps</Link></li>
              <li ><Link to="/browse"  style={{fontSize: '18px',color:'#B401FF'}}>Browse</Link></li>
              <li ><Link to="/notifications" style={{fontSize: '18px',color:'#B401FF'}}>Notifications</Link></li>
              <li ><Link to="/swaprequests" style={{fontSize: '18px',color:'#B401FF'}}>Swap Requests</Link></li>
              <li className="dropdown" style={{height:'50px'}}>
             
  <button className="dropdown-toggle" style={{border:'none',backgroundColor:'white',color:'#B401FF',fontSize: '18px'}} id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Messages
    <span className="caret" style={{color:'#B401FF'}}></span>
  </button>
  <ul style={{minWidth:'300px',height:'350px',overflow:'scroll'}} className="dropdown-menu" aria-labelledby="dropdownMenu1">
    {this.state.participants}

    {/* <li role="separator" className="divider"></li>
    <li><a href="#">Separated link</a></li> */}
  </ul>
              </li>
<li className="hidden-sm">
<form className="navbar-form navbar-right ">
              <div className="form-group">
                <i className="icon ion-android-search" />
                <input style={{borderColor: '#B401FF',borderWidth:'2',color:'#B401FF'}} type="text" className="form-control" placeholder="Search statuses, users" onKeyDown={(event) => {
                
                if(event.keyCode == 13){
                  event.preventDefault();
                  this.goOnSearch();
                 }else {
                   this.setState({
                     searchValue: event.target.value
                   })
                 }
                }} />
              </div>
            </form>
</li>
            </ul>
          
        
       
          </div>{/* /.navbar-collapse */}
        </div>{/* /.container */}
      </nav>




      <div className="navbar-mobile hidden-lg hidden-md">
              <div className="mobile-menu">


                <ul className="list-inline">
                <li>
              <img style={{width:'50px'}} src="images/app_logo.png" alt="logo" />
              </li>
              {/* <li  ><a href="#" onClick={() => this.tabClicked('home')} style={{fontSize: '18px',color:'#B401FF'}}>Home</a></li> */}
              <li><Link to="/home" style={{fontSize: '24px',color:'#B401FF'}}><i className="fa fa-home"></i></Link></li>
              <li><Link to="/swaps" style={{fontSize: '24px',color:'#B401FF'}}><i className="fa fa-exchange"></i></Link></li>
              <li ><Link to="/browse" style={{fontSize: '14px',color:'#B401FF'}}>Browse</Link></li>
              <li ><Link to="/notifications" style={{fontSize: '24px',color:'#B401FF'}}><i className="fa fa-bell" /></Link></li>
              <li ><Link to="/swaprequests" style={{fontSize: '14px',color:'#B401FF'}}>Swap Requests</Link></li>
              <li ><Link to="/profile" style={{fontSize: '24px',color:'#B401FF'}}><i className="fa fa-user" /></Link></li>
            
              <li>
              <button className="dropdown-toggle" style={{border:'none',backgroundColor:'white',color:'#B401FF',fontSize: '18px'}} id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    Messages
    <span className="caret" style={{color:'#B401FF'}}></span>
  </button>
  <ul style={{minWidth:'300px',height:'350px',overflow:'scroll'}} className="dropdown-menu" aria-labelledby="dropdownMenu1">
    {this.state.participants}

    {/* <li role="separator" className="divider"></li>
    <li><a href="#">Separated link</a></li> */}
  </ul>
              </li>

                </ul>
              </div>
            </div>{/*Timeline Menu for Small Screens End*/}
    </header>

        );
    }

}

export default withRouter(Topbar);