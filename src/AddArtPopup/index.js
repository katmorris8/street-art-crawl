import React, { Component } from 'react'
import Popup from "reactjs-popup"; 

class AddArtPopup extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       selectedFile: null
    }
  }
  

  fileHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0]
    }) 
  }
  uploadHandler = () => {
    console.log(this.state.selectedFile);
  }
  render() {
    return (

    <Popup trigger={<button>Button</button>} position="right center">
      <div>
        <input type='file' onChange={this.fileHandler}/>
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    </Popup>
    )
  }
}


export default AddArtPopup