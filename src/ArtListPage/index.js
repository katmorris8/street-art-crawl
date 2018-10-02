import React, { Component } from 'react';
import Art from '../Art';
import './style.css';


class ArtListPage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const art = [...this.props.art].reverse();
        return (
            <div className='art-list-page'>
                {art.map(art => {
                    return (
                        <Art
                            key={art.id}
                            neighborhood={art.neighborhood}
                            location={art.location}
                            date={art.date}
                            description={art.description}
                            posterPath={art.posterPath}
                            imageUrl={art.imageUrl}
                        />
                    )
                })}

            </div>
        )
    }
}

export default ArtListPage;
