import React from "react";
import Topbar from "./Topbar.js";
import { OldSocialLogin as SocialLogin } from 'react-social-login';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Connection from '../Connection';
import base64 from 'base-64';
import { FacebookLoginButton, TwitterLoginButton, InstagramLoginButton, GoogleLoginButton, GithubLoginButton } from "react-social-login-buttons";
export default class SignUpComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    state = {
        isLoggedIn: false,
    }

    handleSocialLogin = (user, err) => {
        const { history } = useHistory();

        console.log(user);

        if (user._profile) {
            user = user._profile;
            var url = Connection.getBaseUrl() + "auth/slogin?net=facebook&name=" + user.firstName + " " + user.lastName +
                "&id=" + user.id + "&profile_image=" + base64.encode(user.profilePicURL);
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.isError) {
                        alert(res.message);
                    } else if (res.isUserRegistered) {
                        if (Connection.setLoginSession(res.user)) {
                            console.log(history);
                            history.push("/");

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
                                                <input type="text" className="form-control" id="example-name" placeholder="Enter name" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="email" className="form-control" id="example-email" placeholder="Enter email" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input type="password" className="form-control" id="example-password" placeholder="Enter a password" />
                                            </fieldset>
                                        </form>

                                        <button className="btn-secondary">Signup</button>
                                    </div>
                                    <a href="#">Already have an account?</a>
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