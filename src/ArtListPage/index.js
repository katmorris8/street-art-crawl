import React, { Component } from 'react';
import Art from '../Art';
import './style.css';


class ArtListPage extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        let arts = this.props.art.reverse();
        return (
            <div className='art-list-page'>
                {arts.map(art => {
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
