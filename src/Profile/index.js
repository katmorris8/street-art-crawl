import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';


class Profile extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         user:[]
      }
    }
    

    componentDidMount = async () => {
        this.fetchUser();
    }

    fetchUser = async () => {
        const response = await fetch('/api/current-user',{
            headers: {
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
        const user = await response.json();
        this.setState({
            user: user
        })
        console.log('users: ', this.state.user);
    }

    render() {
        return (
            <div className='profile-container'>
                <img src='' alt='Profile Image'/>
                <h1 className='profile-title'>Hello, {this.state.user.username}</h1>
                <p className='points-header'>points</p>

            </div>
        )
    }
}

export default Profile;
