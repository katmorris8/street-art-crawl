import React, { Component } from "react";
import "./style.css";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import LeafletMap from '../Map';


class MapPage extends Component {
  render() {
    return (
      <div>
        <LeafletMap lat={this.props.lat} long={this.props.long} zoom={this.props.zoom} />
      </div>
    )
  }
}

export default MapPage;