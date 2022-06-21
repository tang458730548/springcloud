import React, { Component } from 'react';

import ILine from './charts/ILine.js';

class Home extends Component {

    constructor(props) {

        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    render() {
        const style={width : '100%' , height : '100%'}
        return (
            <div className='home-container'>
                <div className='home-container-top'>
                    <div><ILine containerId='container1' style ={style}/></div>
                    <div><ILine containerId='container2' style ={style}/></div>
                    <div></div>
                </div>
                <div className='home-container-middle'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className='home-container-bottom'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default Home;                                                                                               