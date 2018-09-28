import React, { Component } from "react";
import "./style.css";
import HomePage from '../HomePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MapPage from '../MapPage';
import Profile from '../Profile';
import Register from "../Register";
import Login from "../Login";


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 15,
      isLoggedIn: false
    }
  }

  showPosition = (position) => {
    let latlong = [position.coords.latitude, position.coords.longitude];
    this.setState({
      lat: latlong[0],
      lng: latlong[1]
    })
  }
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

  getLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  render() {
    return (

      <div className="App">
        <Router>
          <div className='nav-container'>
            {!this.state.isLoggedIn &&
              <div>
                <Link to='/register'>
                  <button className='register-btn'>Register</button>
                </Link>

                <Link to='/login'>
                  <button className='login-btn'>Login</button>
                </Link>
              </div>
            }
            {this.state.isLoggedIn &&
              <nav className='nav-bar homepage-nav'>
                <Link to='/'>Home</Link>
                &nbsp;
                <Link to='/map'>Map</Link>
                &nbsp;
                <Link to='/profile'>Profile</Link>
              </nav>}
            <Route path="/register" render={(props) => <Register {...props} getLoggedIn={this.getLoggedIn}/>}/>
            <Route path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} getLoggedIn={this.getLoggedIn}/>}/>
            <Route path="/" exact component={HomePage} />
            <Route path="/map" render={(props) => <MapPage {...props} lat={this.state.lat} long={this.state.lng} zoom={this.state.zoom}/>} />
            <Route path="/profile" exact component={Profile} />
            
          </div>
        </Router>



      </div>


    )
  }
}

export default App;