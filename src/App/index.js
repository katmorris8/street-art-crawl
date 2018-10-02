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
          'https://www.new-york-city-travel-tips.com/wordpress/wp-content/uploads/2015/01/Street-Art-Buswick-BPVNY-MPVNY-NYCTT-28-600x401.jpg',
          'Bushwick'
        ],
        [
          40.8115,
          -73.9465,
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBNlB3OCAf7d8dd27Rg_9TtNzS2cCIMYpmwZD8k26-QWgMt1mnlw',
          "Harlem"

        ],
        [
          40.7512,
          -73.9036,
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS961HclfdvvAUc1uOywlDo44PeqiXG9_EUvOylrZ5IyZJ1GPSM',
          'Woodside'
        ]
      ],
      isLoggedIn: false,
      popupInfoImage: [],
      popupInfoStreet: []
    }
  }

  showPosition = (position) => {
    let latlong = [position.coords.latitude, position.coords.longitude,this.state.popupInfoImage,this.state.popupInfoStreet];
    let newMarkers =[...this.state.markers]
    newMarkers.push(latlong);
    this.setState({ 
      markers: newMarkers
    })
  }
  currentLocation = () => {
    navigator.geolocation.getCurrentPosition(this.showPosition);

  }
  // componentDidMount = () => {
  //   this.currentLocation();
  // }

  getLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    })
  }


  getPopupInfo = (image, street) => {
    let newPopupInfoImage = [...this.state.popupInfoImage];
    let newPopupInfoStreet = [...this.state.popupInfoStreet];
    newPopupInfoImage.push(image)
    newPopupInfoStreet.push(street)
    this.setState({
      popupInfoImage: newPopupInfoImage,
      popupInfoStreet: newPopupInfoStreet
    })

 }   
  logOut = () => {
    localStorage.clear();
    this.setState({
      isLoggedIn: false
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


            <nav className='nav-bar homepage-nav'>
              <Link to='/'>Home</Link>
              &nbsp;
                <Link to='/map'>Map</Link>
              &nbsp;
                <Link to='/profile'>Profile</Link>
              &nbsp;
                <Link to='/'><button className='logout-btn' onClick={this.logOut}>Log Out</button></Link>
            </nav>
            <Route path="/register" exact render={(props) => <Register {...props} getLoggedIn={this.getLoggedIn} />} />
            <Route path="/login" exact render={(props) => <Login {...props} getLoggedIn={this.getLoggedIn} />} />
            <Route path="/" exact render={(props) => <HomePage {...props} getPopupInfo={this.getPopupInfo} isLoggedIn={this.state.isLoggedIn} currentLocation={this.currentLocation} showPosition={this.showPosition}/>} />
            <Route path="/map" exact render={(props) => <MapPage {...props} markers={this.state.markers}/>} />
            <PrivateRoute path="/profile" exact component={Profile} />

          </div>
        </Router>



      </div>


    )
  }
}

export default App;