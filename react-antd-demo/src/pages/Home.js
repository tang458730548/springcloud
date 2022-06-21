import React, { Component } from 'react';
import moment from 'moment'
import {Calendar} from 'antd'

class Home extends Component {

    constructor(props) {

        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <div className="site-config-provider-calendar-wrapper">
                    <Calendar fullscreen={false} value={moment()} />
                    {/* <Calendar fullscreen={false} value={moment()} /> */}
                </div>
            </div>
        )
    }
}

export default Home;                                                                                               