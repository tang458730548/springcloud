import React, { Component } from 'react';
class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('进来了--userInfo')
    }

    render() {
        const {props}  = this.props
        return (
            <div className='user-info-main'>
                个人中心 
            </div>
        )
    }
}

export default UserInfo;                                                                                                 