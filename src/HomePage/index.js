import React, { Component } from "react";
import './style.css';


class HomePage extends Component {
    constructor(props) {
        super(props)
    }



    render() {
        return (
            <div className='homepage-container'>
                <h1 className='homepage-title'>Street Art Crawl</h1>
            </div>
        )
    }
}
export default HomePage;