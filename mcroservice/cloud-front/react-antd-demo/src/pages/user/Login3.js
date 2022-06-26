import React, { Component, useState } from 'react';
import { Button, Space, Spin, Row, Input, Form, message, Layout, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
class Login extends Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: false,
            collapsed: false
        }

    }

    componentDidMount() {

        this.setState({
            loading: true
        })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 2000);
    }

    onSubmit() {
        message.success(`登录成功！`)
    }

    render() {
        return (
            <Layout className='layout-main'>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src='./../favicon.ico'></img><span style={{ color: 'white', fontSize: '16px' }}>xxxx管理系统</span>
                    </div>
                    <Menu
                        style={{ height: '100%' }}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => {
                                this.setState({
                                    collapsed: !this.state.collapsed
                                })
                            },
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Login;                                                                                               