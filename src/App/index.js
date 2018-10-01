import React, { Component } from "react";
import "./style.css";
import HomePage from '../HomePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MapPage from '../MapPage';
import Profile from '../Profile';
import Register from "../Register";
import Login from "../Login";
import PrivateRoute from '../PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      markers: [
        [
          40.7527,
          -73.9772,
        ]
      ],
      isLoggedIn: false
    }
  }

  showPosition = (position) => {
    let latlong = [position.coords.latitude, position.coords.longitude];
    let newMarkers =[...this.state.markers]
    newMarkers.push(latlong);
    this.setState({ 
      markers: newMarkers
    })
    console.log('in Show:', this.state.markers);
  }
  currentLocation = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition);

  }
  componentDidMount = () => {
    this.currentLocation();
  }

  getLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  getPopupInfo = (image, street) => {

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


            <nav className='nav-bar homepage-nav'>
              <Link to='/'>Home</Link>
              &nbsp;
                <Link to='/map'>Map</Link>
              &nbsp;
                <Link to='/profile'>Profile</Link>
            </nav>
            <Route path="/register" exact render={(props) => <Register {...props} getLoggedIn={this.getLoggedIn} />} />
            <Route path="/login" exact render={(props) => <Login {...props} getLoggedIn={this.getLoggedIn} />} />
            <Route path="/" exact render={(props) => <HomePage {...props} isLoggedIn={this.state.isLoggedIn} currentLocation={this.currentLocation} showPosition={this.showPosition}/>} />
            <Route path="/map" exact render={(props) => <MapPage {...props} markers={this.state.markers}/>} />
            <PrivateRoute path="/profile" exact component={Profile} />

          </div>
        </Router>



      </div>


    )
  }
}

export default App;