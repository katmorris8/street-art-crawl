import React, { Component } from 'react'
import Popup from "reactjs-popup"; 

class AddArtPopup extends Component {
  render() {
    return (

    <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
    </Popup>
    )
  }
}


export default AddArtPopup