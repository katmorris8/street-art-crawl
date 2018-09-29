import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';


class Profile extends Component {
    render() {
        return (
            <div className='profile-container'>
                <img src='#' alt='Profile Image'/>
                <h1 className='profile-title'>Hello, username</h1>
                <p className='points-header'>points</p>

            </div>
        )
    }
}

export default Profile;
