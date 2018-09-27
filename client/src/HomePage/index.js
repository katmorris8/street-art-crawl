import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';


class Homepage extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div className='homepage-container'>
                {!this.props.loggedIn &&
                    <div>
                        <button className='login-btn'>Login</button>
                        <button className='register-btn'>Register</button>
                    </div>
                }
                {this.props.loggedIn &&
                    <nav className='nav-bar homepage-nav'>
                        <Link to='/home'>Home</Link>
                        &nbsp;
                        <Link to='/map'>Map</Link>
                        &nbsp;
                        <Link to='/profile'>Profile</Link>
                    </nav>}

                    <h1 className='homepage-title'>Street Art Crawl</h1>
                    
            </div>
        )
    }
}