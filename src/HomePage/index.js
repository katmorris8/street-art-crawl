import React, { Component } from "react";
import './style.css';
// import AddArtPopup from '../AddArtPopup';
import Popup from "reactjs-popup";


class HomePage extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div className='homepage-container'>
                <h1 className='homepage-title'>Street Art Crawl</h1>
                {this.props.isLoggedIn &&
                <Popup
                trigger={<button className="show-instructions">Add New Art</button>}
                modal
                closeOnDocumentClick>put form here</Popup> }
            </div>
        )
    }
}
export default HomePage;