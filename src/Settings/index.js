import React, { Component } from 'react'
import PrivateRoute from '../PrivateRoute';

export default class Settings extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         username: '',
      }
    }
    
    deleteUser = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('user-jwt');
        await fetch('/api/current-user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': token
            }
        });
    }

    inputHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }


    updateUsername = async (e) =>{
        e.preventDefault();
        let requestBody = JSON.stringify({
            username: this.state.username
        })

        const response = await fetch('/api/current-user', {
            method: 'PUT',
            body: requestBody,
            headers: {
              'Content-Type': 'application/json',
              'jwt-token': localStorage.getItem('user-jwt'),
            }
          });
    }   

    render() {
        return (
            <div>
                <form onSubmit={this.updateUsername} className='form'>
                    <input onChange={this.inputHandler} className='input' type="text" placeholder='Enter new username' />
                    <button className='button'>Submit</button>
                    <p>Pressing this button will delete your profile! Beware</p>
                    <button className='button delete-button' onClick={this.deleteUser}>Delete Profile</button>
                </form>

            </div>
        )
    }

}
