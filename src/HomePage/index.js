import React, { Component } from "react";
import './style.css';
import ArtListPage from '../ArtListPage';
import Popup from "reactjs-popup";
import AddImage from '../AddImage';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            neighborhood: '',
            location: '',
            description: '',
            users: [],
            art: [],
            imageUrl: ''
        }
    }

    componentDidMount = async () => {
        this.fetchArt();
    }

    fetchArt = async () => {
        const response = await fetch('/api/art');
        const art = await response.json();
        this.setState({
            art: art
        });
    }

    updateStreet = (e) => {
        this.setState({
            location: e.target.value,
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
        let currentDateFormatted = (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
        this.props.currentLocation(this.props.showPosition);
        this.props.getPopupInfo(this.state.imageUrl,this.state.location)
        let newArt = {
            neighborhood: this.state.neighborhood,
            location: this.state.location,
            date: currentDateFormatted,
            description: this.state.description,
            imageUrl: this.state.imageUrl
        }
        this.addArt(newArt)

    }

    addArt = async newArt => {
        const body = JSON.stringify({
            neighborhood: newArt.neighborhood,
            location: newArt.location,
            date: newArt.date,
            description: newArt.description,
            imageUrl: newArt.imageUrl
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

    getImageURL = (url) => {
        this.setState({
            imageUrl: url
        })
    }

    render() {
        return (
            <div className='homepage-container'>
                <h1 className='homepage-title'>Street Art Crawl</h1>
                {this.props.isLoggedIn &&
                    <Popup className="add-art-form"
                        trigger={<button className="add-art-btn button">Add New Art</button>}
                        modal
                        closeOnDocumentClick>

                        <form className="form" onSubmit={this.submitHandler}>
                            <input className="input" type='text' onChange={this.updateStreet} placeholder='Street' />
                            <input className="input" type='text' onChange={this.updateNeighborhood} placeholder='Neighborhood' />
                            <input className="input" type='text' onChange={this.updateDescription} placeholder='Description' />
                            <AddImage getImageURL={this.getImageURL} />
                            <button className="input" className="art-submit-btn button" onClick={this.uploadHandler}>Submit!</button>
                        </form>

                    </Popup>}
                <ArtListPage art={this.state.art} imageUrl={this.state.imageUrl} />
            </div>
        )
    }
}
export default HomePage;