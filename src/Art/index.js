import React, { Component } from 'react';
import "./style.css";

export default class Art extends Component {
  render() {
    return (
      <div className='art-container'>
        <img className='art-img' src={this.props.imageUrl} alt="art-image" />
        <div className='art-info'>
          <h2 className='neighborhood' >{this.props.neighborhood}</h2>
          <p className='street' >{this.props.location}</p>
          <p className='date' >{this.props.date}</p>
        </div>
      </div>
    )
  }
}
