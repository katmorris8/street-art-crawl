import React, { Component } from 'react';
import Art from '../Art';
// import './style.css';


class ArtListPage extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        art: [],
        users: []
      }
    }
    
    componentDidMount = async () => {
        this.fetchArt();
        this.fetchUser();
    }

    fetchArt = async () => {
        const response = await fetch('/api/art');
        const art = await response.json();
        this.setState({
            art: art
        })
    }
    fetchUser = async () => {
        const response = await fetch('/api/current-user',{
            headers: {
                'jwt-token': localStorage.getItem('user-jwt')
            }
        });
    }
    render() {
        return (
            <div className='art-list-page'>
                {this.state.art.map(art => {
                    return(
                        <Art
                            key={art.id}
                            neighborhood={art.neighborhood}
                            location={art.location}
                            date={art.date}
                            description={art.description}
                            posterPath= {art.posterPath}
                            // userId={art.user_id}
                        />
                    )
                })}

            </div>
        )
    }
}

export default ArtListPage;
