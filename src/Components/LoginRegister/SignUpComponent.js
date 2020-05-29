import React from "react";
import Topbar from "./Topbar.js";
import { OldSocialLogin as SocialLogin } from 'react-social-login';
import { Link, withRouter } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Connection from '../Connection';
import base64 from 'base-64';
import { FacebookLoginButton, TwitterLoginButton, InstagramLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
class SignUpComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    state = {
        isLoggedIn: false,
        name: null,
        email: null,
        password: null,
        username: null,
        isLoading: false
    }

    registerUser() {
        var that = this;
        this.setState({ isLoading: true });

        var url = Connection.getBaseUrl() + "auth/registerr?name=" + this.state.name + "&username=" + this.state.username +
            "&email=" + this.state.email + "&password=" + this.state.password;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.isError) {
                    alert(res.message);
                } else if (res.isUserRegistered) {
                    if (Connection.setLoginSession(res.user)) {
                        alert(res.message);
                        that.props.history.push("/home");
                    } else {
                        alert('Error occurred while saving the registeration, please manually login to continue.');
                    }
                } else {
                    alert(res.message);
                }
                this.setState({ isLoading: false });
            })
    }

    handleSocialLogin = (user, err) => {
        var that = this;
        this.setState({ isLoading: true });

        if (user._profile) {
            user = user._profile;
            var url = Connection.getBaseUrl() + "auth/slogin?net=facebook&name=" + user.firstName + " " + user.lastName +
                "&id=" + user.id + "&email=" + user.email + "&profile_image=" + base64.encode(user.profilePicURL);
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.isError) {
                        alert(res.message);
                    } else if (res.isUserRegistered) {
                        if (Connection.setLoginSession(res.user)) {
                            that.props.history.push("/home");
                        } else {
                            alert('Error occurred in saving the login credentials. Please try again.');
                        }
                    }

                })
        } else if (err) {
            console.log(err);
            alert('Either loggedin was cancelled, or an error has occurred. Please try again.');
        } else {
            alert('Either loggedin was cancelled, or an error has occurred. Please try again.');

        }

        this.setState({ isLoading: false });

    }

    render() {


        return (
            <div>
                <Topbar />
                {/* main content */}
                <div id="page-contents">
                    <div className="container-fluid" id="signupform" style={{ height: 1000 }}>
                        <div className="row">
                            <div className="col-md-3">

                            </div>
                            <div className="col-md-7" >
                                <div className="sign-up-form" style={{ background: 0 }}>
                                    <h2 className="text-white">Swap</h2>

                                    <div style={{ width: '100%', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <ClipLoader
                                            size={20}
                                            color={"#123abc"}
                                            loading={this.state.isLoading}
                                        />
                                    </div>

                                    <p className="signup-text">Signup now and meet awesome people around the world</p>

                                    <SocialLogin
                                        provider='facebook'
                                        appId='3284816908244031'
                                        callback={this.handleSocialLogin}
                                    >
                                        <FacebookLoginButton >
                                            <span>Signup with Facebook</span>
                                        </FacebookLoginButton>
                                    </SocialLogin>
                                    <TwitterLoginButton onClick={() => alert("Hello")} >
                                        <span>SignUp with Twitter</span>
                                    </TwitterLoginButton>
                                    <GoogleLoginButton onClick={() => alert("Hello")} >
                                        <span>SignUp with Google</span>
                                    </GoogleLoginButton>
                                    <InstagramLoginButton onClick={() => alert("Hello")} >
                                        <span>SignUp with Instagram</span>
                                    </InstagramLoginButton>
                                    <div className="line-divider" />
                                    <div className="form-wrapper">
                                        <form action="#">
                                            <fieldset className="form-group">
                                                <input type="text" onChange={(text) => { this.setState({ name: text.target.value }) }} className="form-control" id="example-name0" placeholder="Enter Fullname" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="text" onChange={(text) => { this.setState({ username: text.target.value }) }} className="form-control" id="example-name1" placeholder="Enter Username" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="email" onChange={(text) => { this.setState({ email: text.target.value }) }} className="form-control" id="example-email" placeholder="Enter email" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="password" className="form-control" onChange={(text) => { this.setState({ password: text.target.value }) }} id="example-password" placeholder="Enter a password" />
                                            </fieldset>
                                        </form>

                                        <button onClick={() => this.registerUser()} className="btn-secondary">Signup</button>
                                    </div>
                                    <Link to="/login">Already have an account?</Link>
                                    <img className="form-shadow" src="images/bottom-shadow.png" alt="" />
                                </div>{/* Sign Up Form End */}
                            </div>
                            <div className="col-md-1"></div>
                            {/* right bar */}


                            {/* right bar ended */}
                        </div>
                    </div>
                </div>
                {/* main content ended */}

            </div>
        );
    }
}

export default withRouter(SignUpComponent);