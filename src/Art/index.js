import React, { Component } from 'react';

export default class Art extends Component {
  render() {
      console.log(this.props.posterPath);
      console.log('string');
    return (
      <div className='art-container'>
        <img src={this.props.posterPath} alt="art-image"/>
        <h2>{this.props.neighborhood}</h2>
        <p>{this.props.location}</p>
        <p>{this.props.date}</p>
      </div>
    )
  }
}
