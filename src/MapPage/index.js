import React, { Component } from "react";
import "./style.css";
import LeafletMap from '../Map';

class MapPage extends Component {
  render() {
    return (
      <div>
        <LeafletMap markers={this.props.markers} />
      </div>
    )
  }
}

export default MapPage;