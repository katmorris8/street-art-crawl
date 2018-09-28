import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from '../HomePage';

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    register = async () => {
        const requestBody = JSON.stringify({
            firstName: this.state.firstName,  
            lastName: this.state.lastName,  
            email: this.state.email,
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


    logIn = async () => {
        const requestBody = JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        });
        const response = await fetch('/api/login', {
          method: 'POST',
          body: requestBody,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseBody = await response.json();
        if (response.status === 401) {
          this.setState({
            errorMessage: responseBody.message
          });
          return;
        }
        // this.props.onLogIn();
        localStorage.setItem('user-jwt', JSON.stringify(responseBody.token));
      }



    submitHandler = (e) => {
        e.preventDefault();
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
        
                <div>
                    <Link to='/'>
                        <button className='register-back-btn'>Back</button>
                    </Link>
                    <h1>Register</h1>
                    <form onSubmit={this.submitHandler} >
                        <input value={this.state.firstName} onChange={this.onInputChange} type="text" placeholder='First Name' name='firstName' />
                        <input value={this.state.lastName} onChange={this.onInputChange} type="text" placeholder='Last Name' name='lastName' />
                        <input value={this.state.email} onChange={this.onInputChange} type="text" placeholder='Email Address'name='email' />
                        <input value={this.state.username} onChange={this.onInputChange} type="text" placeholder='Username'name='username' />
                        <input value={this.state.password} onChange={this.onInputChange} type="text" placeholder='Password'name='password' />
                        {/* <input value={this.state.password} type="text" placeholder='Confirm Password' /> */}
                        <button type="button" onClick={this.register}>Register</button>
                        <button type="button" onClick={this.logIn}>Login</button>
                    </form>
                </div>
            
        )
    }
}
