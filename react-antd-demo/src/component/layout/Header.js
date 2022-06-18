import React, { Component } from 'react';
import { Button } from 'antd';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className='header-main'>
                <Button type="primary" onClick={() => {
                      window.sessionStorage.removeItem('session');
                      window.location.reload();
                      window.location.hash = '/';
                }}>退出登录</Button>
            </div>
        )
    }
}

export default Header;                                                                                                 