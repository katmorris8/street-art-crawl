import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            isUserLoggedIn: false
        }
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
        if (response.status === 400) {
            this.setState({
                errorMessage: responseBody.message
            });
            return;
        } else if (response.status === 401) {
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
        if (this.state.isUserLoggedIn) {
            const { from } = this.props.location.state || { from: { pathname: "/" } };
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div className="form-page">
                <Link to='/'>
                    <button className='login-back-btn button'>Back</button>
                </Link>
                <h1>Login</h1>
                <form className="form" onSubmit={this.submitHandler} >
                    <input className="input" value={this.state.username} onChange={this.onInputChange} type="text" placeholder='Username' name='username' />
                    <input className="input" value={this.state.password} onChange={this.onInputChange} type="password" placeholder='Password' name='password' />
                    <button className="input" className='button' type="submit" onClick={this.logIn}>Login</button>
                    {this.state.errorMessage && <p className='error-message'>{this.state.errorMessage}</p>}
                </form>
            </div>
        )
    }
}

export default Login;