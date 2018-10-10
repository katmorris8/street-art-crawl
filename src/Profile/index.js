import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
import ArtListPage from '../ArtListPage';
  //
class Profile extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         user: {},
         art: []
      }
    }
    
    componentDidMount = async () => {
        this.fetchUser();
        this.fetchArt();
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
    }

    fetchArt = async () => {
        const response = await fetch('/api/current-user/art', {
            headers: {
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
        const art = await response.json();

        this.setState({
            art: art
        })
    }

    render() {
        return (
            <div className='profile-container'>
                {this.state.user &&
                <h1 className='profile-title'>Hello, {this.state.user.username}</h1>}
                <ArtListPage art={this.state.art} />

            </div>
        )
    }
}

export default Profile;