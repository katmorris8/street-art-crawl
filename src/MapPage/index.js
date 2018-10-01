import React, { Component } from "react";
import "./style.css";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import LeafletMap from '../Map';


class MapPage extends Component {
  render() {
    console.log('in mappage: ', this.props.markers);
    return (
      <div>
        <LeafletMap markers={this.props.markers} />
      </div>
    )
  }
}

export default MapPage;