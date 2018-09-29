import React, { Component } from "react";
import './style.css';
import ArtListPage from '../ArtListPage';
// import AddArtPopup from '../AddArtPopup';
import Popup from "reactjs-popup";


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            neighborhood: '',
            location: '',
            date: '',
            description: '',
            posterPath: ''


            
        }
    }


    fileHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    updateStreet = (e) => {
        this.setState({
            location: e. target.value,
        })
    }    
    updateNeighborhood = (e) => {
        this.setState({
            neighborhood: e.target.value,
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        let currentDate = new Date();
        let currentDateFormatted = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        this.setState({
            date: currentDateFormatted
        })
        this.props.currentLocation();
    }


    addArt = async newArt => {
        console.log('in add art');
        const body = JSON.stringify({
          neighborhood: newArt.neighborhood,
          location: newArt.location,
          date: newArt.date,
          description: newArt.description,
          posterPath: newArt.posterPath
        });
    
        fetch('/api/art', {
          method: 'POST',
          body: body,
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // this.refresh();
    
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

                        <form onSubmit={this.submitHandler}>
                            <input type='text' onChange={this.updateStreet} placeholder='Street'/>
                            <input type='text' onChange={this.updateNeighborhood}  placeholder='Neighborhood'/>
                            <input type='file' onChange={this.fileHandler} placeholder="Image"/>
                            <button onClick={this.uploadHandler}>Submit!</button>
                        </form>

                    </Popup>}
                <ArtListPage />
            </div>
        )
    }
}
export default HomePage;