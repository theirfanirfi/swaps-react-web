import React from "react";
import {
    Link,
    withRouter
} from "react-router-dom";
import Connection from "../Connection.js";
import TopbarChatList from "../Chat/TopBarChatList.js";

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', participants: [], searchValue: '' };
    }

    goOnSearch = () => {
        // let history = useHistory();
        let path = "/search/" + this.state.searchValue;
        this.props.history.push(path);
    }


    render() {


        return (

            <header id="header">

                <nav className="timeline-nav-bar hidden-sm hidden-xs navbar navbar-default navbar-fixed-top menu" style={{ backgroundColor: 'white', borderBottomWidth: '4', borderBottomColor: '#B401FF' }}>
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">

                        </div>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div >
                            <ul id="swaptopmenu">
                                <li>
                                    <img style={{ width: '50px' }} src={process.env.PUBLIC_URL + "/images/app_logo.png"} alt="logo" />
                                </li>
                                {/* <li  ><a href="#" onClick={() => this.tabClicked('home')} style={{fontSize: '18px',color:'#B401FF'}}>Home</a></li> */}
                                <li  ><Link to="/home" style={{ fontSize: '20px', color: '#B401FF' }}>Home</Link></li>


                                <li className="hidden-sm">
                                    <form className="navbar-form navbar-right ">
                                        <div className="form-group">
                                            <i className="icon ion-android-search" />
                                            <input style={{ borderColor: '#B401FF', borderWidth: '2', color: '#B401FF' }} type="text" className="form-control" placeholder="Search statuses, users" onKeyDown={(event) => {

                                                if (event.keyCode == 13) {
                                                    event.preventDefault();
                                                    this.goOnSearch();
                                                } else {
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
                                <img style={{ width: '50px' }} src="images/app_logo.png" alt="logo" />
                            </li>
                            {/* <li  ><a href="#" onClick={() => this.tabClicked('home')} style={{fontSize: '18px',color:'#B401FF'}}>Home</a></li> */}
                            <li><Link to="/home" style={{ fontSize: '24px', color: '#B401FF' }}><i className="fa fa-home"></i></Link></li>



                        </ul>
                    </div>
                </div>{/*Timeline Menu for Small Screens End*/}
            </header>

        );
    }

}

export default withRouter(Topbar);