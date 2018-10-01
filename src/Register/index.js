import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
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
            errorMessage: '',
            isUserLoggedIn:false
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
        console.log(responseBody.message);
        if (response.status === 409) {
            this.setState({
                errorMessage: responseBody.message
            });
            return;
        } else if(response.status === 400){
            this.setState({
                errorMessage: responseBody.error
            });
            return;
        }

        localStorage.setItem('user-jwt', JSON.stringify(responseBody.token));
        this.setState({
            isUserLoggedIn: true
        });
        this.props.getLoggedIn();
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
        console.log('logged in:', this.state.isUserLoggedIn)
        if (this.state.isUserLoggedIn) {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            return (
                <Redirect to={from} />
            )
        }
        return (

            <div>
                <Link to='/'>
                    <button className='register-back-btn'>Back</button>
                </Link>
                <h1>Register</h1>
                <form onSubmit={this.submitHandler} >
                    <input value={this.state.firstName} onChange={this.onInputChange} type="text" placeholder='First Name' name='firstName' />
                    <input value={this.state.lastName} onChange={this.onInputChange} type="text" placeholder='Last Name' name='lastName' />
                    <input value={this.state.email} onChange={this.onInputChange} type="text" placeholder='Email Address' name='email' />
                    <input value={this.state.username} onChange={this.onInputChange} type="text" placeholder='Username' name='username' />
                    <input value={this.state.password} onChange={this.onInputChange} type="text" placeholder='Password' name='password' />
                    {console.log(this.state.errorMessage)}
                    {/* <input value={this.state.password} type="text" placeholder='Confirm Password' /> */}
                    <button type="submit" onClick={this.register}>Register</button>
                    {this.state.errorMessage && <p className='error-message'>{this.state.errorMessage}</p>}
                </form>
                <PrivateRoute path='/' exact component={HomePage}/>
            </div>

        )
    }
}
