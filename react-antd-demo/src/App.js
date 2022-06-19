import React, { Component } from 'react';
import { message, Layout, Menu, Breadcrumb, ConfigProvider, Radio, Tabs } from 'antd';
import Login from './pages/user/Login'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    HomeOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Routers from './router';
import { Footer } from 'antd/lib/layout/layout';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import Menus from './config/menu'
moment.locale('en');

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            locale: 'en',
            session: JSON.parse(window.sessionStorage.getItem('session')),
            loading: false,
            collapsed: false,
            current: undefined,
            breadcrumbList: [
            ],
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

    getChild(items , arrays) {
        return items.forEach(item => {
            if (item.children) {
                this.getChild(item.children)
            }
            return item;
        })
    }

    onChange(key) {
        this.setActiveKey(key);

        let arrays = []
        // arrays.push(1)
        this.getChild(Menus , arrays)

        const item = arrays.filter(item => {
            return item.key === key
        })
        message.success(`点击了${item[0].label}`)
        window.location.href = `#${item[0].router}`
    }

    onEdit(targetKey, action) {
        if (action !== 'add') {
            this.remove(targetKey);
        }
    }

    remove(targetKey) {
        const breadcrumbList = this.state.breadcrumbList;
        breadcrumbList.forEach((pane, i) => {
            if (pane.key === targetKey) {
                breadcrumbList.splice(i, 1)
            }
        });

        this.setState({
            breadcrumbList: breadcrumbList
        })

        if (breadcrumbList.length > 0) {
            const newActiveKey = breadcrumbList[breadcrumbList.length - 1].key
            this.setActiveKey(newActiveKey);
        } else {
            this.setActiveKey(undefined);
        }
    }


    setActiveKey(key) {
        this.setState({
            activeKey: key
        })
    }

    getChildren(item) {
        if (!item.children) {
            return {
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => {
                    const breadcrumbList = this.state.breadcrumbList
                    const key = item.key
                    if (!breadcrumbList.some(item => {
                        return item.key === key
                    })) {
                        breadcrumbList.push({
                            title: item.label,
                            content: item.content,
                            key: key
                        });
                    }
                    this.onChange(key)
                    this.setState({
                        breadcrumbList: breadcrumbList
                    })
                    window.location.href = `#${item.router}`
                },
            }
        }
        return {
            key: item.key,
            icon: item.icon,
            label: item.label,
            children:
                item.children.map(i => {
                    return this.getChildren(i)
                })
        }
    }

    handleMenus(Menus) {
        return Menus.map(item => {
            return this.getChildren(item);
        })
    }

    render() {
        return (
            <ConfigProvider locale={this.state.locale}>
                <div className='div-container-main'>
                    {
                        this.state.session ?
                            <Layout className='layout-main'>
                                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ height: 'calc(100% - 60px)' }}>
                                    <div className="logo" style={{ height: '60px' }}>
                                        <a href='#/'><img alt="图像" src='./../favicon.ico' /><span style={{ color: 'white', fontSize: '16px' }}>xxxx管理系统</span></a>
                                    </div>
                                    <Menu
                                        style={{ height: '100%' }}
                                        theme="dark"
                                        mode="inline"
                                        defaultSelectedKeys={['1']}
                                        items={
                                            this.handleMenus(Menus)
                                        }
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
                                        <span style={{ float: "right", width: '15%' }}>
                                            <Radio.Group value={this.state.locale} onChange={(event) => {
                                                this.setState({
                                                    locale: event.target.value
                                                })
                                            }}>
                                                <Radio.Button key="en" value={enUS}>
                                                    English
                                                </Radio.Button>
                                                <Radio.Button key="cn" value={zhCN}>
                                                    中文
                                                </Radio.Button>
                                            </Radio.Group>
                                        </span>
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
                                        {
                                            <Tabs hideAdd onChange={this.onChange.bind(this)} activeKey={this.state.activeKey} type="editable-card" onEdit={this.onEdit.bind(this)}>
                                                {
                                                    this.state.breadcrumbList.map((pane) => (
                                                        <TabPane tab={pane.title} key={pane.key}>
                                                        </TabPane>
                                                    ))
                                                }
                                            </Tabs>
                                        }
                                        <div className='div-container-main'>
                                            <div className='admin-control'>
                                                <div className='div-router-main'>
                                                    <HashRouter>
                                                        <Routes>
                                                            {
                                                                Routers.map((item) => {
                                                                    return <Route key={item.path} path={item.path} exact={item.exact} element={item.element}></Route>
                                                                })
                                                            }
                                                        </Routes>
                                                    </HashRouter>
                                                </div>
                                            </div>
                                        </div>
                                    </Content>
                                    <Footer style={{ textAlign: 'center' }}>xx xx ©2022 xxxxxxxxxx</Footer>
                                </Layout>
                            </Layout>
                            :
                            <Login>

                            </Login>
                    }
                </div>
            </ConfigProvider>
        )
    }
}

export default App;                                                                                                 