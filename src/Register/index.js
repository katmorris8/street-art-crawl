import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from '../HomePage';

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    register = async () => {
        const requestBody = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        });
        const response = await fetch('/api/register', {
            method: 'POST',
            body: requestBody,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseBody = await response.json();
        if (response.status === 409) {
            this.setState({
                errorMessage: responseBody.message
            });
            return;
        }
        //   this.props.onLogIn();
        localStorage.setItem('user-jwt', JSON.stringify(responseBody.token));
    }



    submitHandler = (e) => {
        e.preventDefault();
        this.register();

    }

    render() {
        return (
        
                <div>
                    <Link to='/'>
                        <button className='register-back-btn'>Back</button>
                    </Link>
                    <h1>Register</h1>
                    <form onSubmit={this.submitHandler} >
                        <input value={this.state.value} type="text" placeholder='First Name' />
                        <input value={this.state.value} type="text" placeholder='Last Name' />
                        <input value={this.state.value} type="text" placeholder='Email Address' />
                        <input value={this.state.value} type="text" placeholder='Username' />
                        <input value={this.state.value} type="text" placeholder='Password' />
                        <input value={this.state.value} type="text" placeholder='Confirm Password' />
                        <input type="submit" value="submit" />
                    </form>
                </div>
            
        )
    }
}
