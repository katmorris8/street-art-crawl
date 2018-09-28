import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import HomePage from '../HomePage';



class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
        username: '',
        password: '',
        errorMessage: ''
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
  if (response.status === 401) {
      this.setState({
          errorMessage: responseBody.message
      });
      return;
  }
  this.props.getLoggedIn();
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
  if (this.props.isLoggedIn){
    const { from } = this.props.location.state || {from: { pathname: "/"} };
    return(
      <Redirect to={from}/>
    )
  }
  return (

      <div>
          <Link to='/'>
              <button className='login-back-btn'>Back</button>
          </Link>
          <h1>Login</h1>
          <form onSubmit={this.submitHandler} >
              <input value={this.state.username} onChange={this.onInputChange} type="text" placeholder='Username' name='username' />
              <input value={this.state.password} onChange={this.onInputChange} type="text" placeholder='Password' name='password' />
              <button type="button" onClick={this.register}>Register</button>
              <button type="button" onClick={this.logIn}>Login</button>
          </form>
          <PrivateRoute path='/' exact component={HomePage}/>
      </div>

  )
}
}

export default Login;