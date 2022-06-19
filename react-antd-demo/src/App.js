import React, { Component } from 'react';
import { message, Layout, Menu, Breadcrumb } from 'antd';
import Login from './pages/user/Login'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Routers from './router';
import { Footer } from 'antd/lib/layout/layout';

const { Header, Sider, Content } = Layout;
class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            session: JSON.parse(window.sessionStorage.getItem('session')),
            loading: false,
            collapsed: false,
            current: undefined,
            items: [
                {
                    label: '消息中心',
                    key: 'mail',
                    icon: <MailOutlined />,
                },
                {
                    label: '设置',
                    key: 'SubMenu',
                    icon: <UserOutlined />,
                    children: [
                        {
                            label: (
                                <div onClick={() => {
                                    window.location.hash = '#/user/info'
                                }}>个人中心</div>
                            ),
                            key: 'setting:1',
                        },
                        {
                            label: '修改密码',
                            key: 'setting:2',
                        },
                        {
                            // label: '退出登录',
                            label: (
                                <div onClick={() => {
                                    window.sessionStorage.removeItem('session')
                                    message.success(`退出登录成功！`)
                                    setTimeout(() => {
                                        window.location.reload()
                                        window.location.hash = '#/'
                                    }, 1000);
                                }}>退出登录</div>
                            ),
                            key: 'setting:3',
                        },
                    ],
                },
            ]
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

    onClick(e) {
        console.log(e)
        this.setState({
        })
    }

    render() {
        return (
            <div className='div-container-main'>
                {
                    this.state.session ?
                        <Layout className='layout-main'>
                            <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ height: 'calc(100% - 60px)' }}>
                                <div className="logo" style={{ height: '60px' }}>
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
                            <Layout className="site-layout" >
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
                                    <span style={{ float: "right", width: '20%' }}>
                                        <Menu onClick={this.onClick.bind(this)} selectedKeys={this.state.current} mode="horizontal" items={this.state.items} />
                                    </span>
                                </Header>
                                <Content
                                    className="site-layout-background"
                                    style={{
                                        margin: '24px 16px',
                                        padding: 24,
                                        minHeight: 280,
                                    }}
                                >
                                    <Breadcrumb
                                        style={{
                                            margin: '16px 0',
                                        }}
                                    >
                                        <Breadcrumb.Item>User</Breadcrumb.Item>
                                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <div className='div-container-main'>
                                        <div className='admin-control'>
                                            <div className='div-router-main'>
                                                <HashRouter>
                                                    <Routes>
                                                        {
                                                            Routers.map((item) => {
                                                                return <Route path={item.path} exact={item.exact} element={item.element}></Route>
                                                            })
                                                        }
                                                    </Routes>
                                                </HashRouter>
                                            </div>
                                        </div>
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                        :
                        <Login></Login>
                }
            </div>
        )
    }
}

export default App;                                                                                                 