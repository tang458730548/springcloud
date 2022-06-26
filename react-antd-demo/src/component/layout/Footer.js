import React, { Component } from 'react';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='footer-main'>
                <span className='span-content'>
                    Copyright© 2022 Create by Tsc {`${new Date().getFullYear()} 年 ${new Date().getMonth()+1} 月 ${new Date().getDate()} 日`}
                </span>
            </div>
        )
    }
}

export default Footer;                                                                                                 