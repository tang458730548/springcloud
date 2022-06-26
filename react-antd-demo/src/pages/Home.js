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
        const style = { width: '100%', height: '100%' }
        return (
            <div className='home-container'>
                <div className='home-container-top'>
                    <div><ILine containerId='container1' style={style} /></div>
                    <div><ILine containerId='container2' style={style} /></div>
                    <div><ILine containerId='container3' style={style} /></div>
                </div>
                <div className='home-container-middle'>
                    <div><ILine containerId='container4' style={style} /></div>
                    <div><ILine containerId='container5' style={style} /></div>
                    <div><ILine containerId='container6' style={style} /></div>
                </div>
                <div className='home-container-bottom'>
                    <div><ILine containerId='container7' style={style} /></div>
                    <div><ILine containerId='container8' style={style} /></div>
                    <div><ILine containerId='container9' style={style} /></div>
                </div>
            </div>
        )
    }
}

export default Home;                                                                                               