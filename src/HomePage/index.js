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
            description: '',
            users: [],
            art: []


            
        }
    }
    componentDidMount = async () => {
        this.fetchArt();
        // this.fetchUser();
    }

    fetchArt = async () => {
        const response = await fetch('/api/art');
        const art = await response.json();
        this.setState({
            art: art
        })
    }
    // fetchUser = async () => {
    //     const response = await fetch('/api/current-user',{
    //         headers: {
    //             'jwt-token': localStorage.getItem('user-jwt')
    //         }
    //     });
    // }


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
    updateDescription = (e) => {
        this.setState({
            description: e.target.value,
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        let currentDate = new Date();
        let currentDateFormatted = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        this.props.currentLocation();
        let newArt = {
            neighborhood: this.state.neighborhood,
            location: this.state.location,
            date: currentDateFormatted,
            description: this.state.description,
            posterPath: this.state.selectedFile
        }
        this.addArt(newArt)
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
    
        this.fetchArt();
    
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
                            <input type='text' onChange={this.updateDescription}  placeholder='Description'/>                                                      
                            <input type='file' onChange={this.fileHandler} placeholder="Image"/>
                            <button onClick={this.uploadHandler}>Submit!</button>
                        </form>

                    </Popup>}
                <ArtListPage art={this.state.art} />
            </div>
        )
    }
}
export default HomePage;