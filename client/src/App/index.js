import React, { Component } from "react";
import "./style.css";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import LeafletMap from '../Map';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
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

  render() {
    return (
      <div>
        <div className="App">Hello World</div>
        <LeafletMap lat={this.state.lat} long={this.state.lng} zoom={this.state.zoom} />
      </div>
    )
  }
}

export default App;
