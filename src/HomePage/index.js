import React, { Component } from "react";
import './style.css';
import ArtListPage from '../ArtListPage';
// import AddArtPopup from '../AddArtPopup';
import Popup from "reactjs-popup";


class HomePage extends Component {
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
            <div className='homepage-container'>
                <h1 className='homepage-title'>Street Art Crawl</h1>
                {this.props.isLoggedIn &&
                <Popup
                trigger={<button className="show-instructions">Add New Art</button>}
                modal
                closeOnDocumentClick>
                <input type='file' onChange={this.fileHandler}/>
                <button onClick={this.uploadHandler}>Upload!</button>
                </Popup> }
                <ArtListPage/>
            </div>
        )
    }
}
export default HomePage;