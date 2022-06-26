import React, { Component } from 'react';
import { message, Layout, Menu, ConfigProvider, Tabs, Affix, Modal } from 'antd';
import Login from './pages/user/Login'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    StopOutlined,
    WechatOutlined,
    QqOutlined
} from '@ant-design/icons';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Routers from './router';
import { Footer } from 'antd/lib/layout/layout';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import Menus from './config/menu'
import TopeMenus from './config/topMenu'
import topMenu from './config/topMenu';
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
            activeKey: undefined,
            breadcrumbList: [
            ],
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

    getChild(items, arrays) {
        items.forEach(item => {
            if (item.children) {
                this.getChild(item.children, arrays)
            }

            arrays.push(item)
        })
        return arrays;
    }

    onChange(key) {
        this.setActiveKey(key);
        const newMenus = Menus.concat(topMenu);
        let arrays = this.getChild(newMenus, [])
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
                    if (!item.onClick) {
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
                    }
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

    handCloseTabs(key) {
        const breadcrumbList = this.state.breadcrumbList;
        if (key === '1') {
            //关闭当前
            breadcrumbList.forEach((item, index) => {
                if (item.key === this.state.activeKey) {
                    breadcrumbList.splice(index, 1)
                    if (breadcrumbList.length > 0) {
                        this.setActiveKey(breadcrumbList[breadcrumbList.length - 1].key)
                        this.onChange(breadcrumbList[breadcrumbList.length - 1].key)
                    }
                    this.setState({
                        breadcrumbList: breadcrumbList
                    })
                }
            })

        } else if (key === '2') {
            //关闭其他
            const newList = breadcrumbList.filter(item => {
                return item.key === this.state.activeKey
            })
            this.setActiveKey(newList[0].key)
            this.onChange(newList[0].key)
            this.setState({
                breadcrumbList: newList
            })

        } else if (key === '3') {
            debugger
            //关闭右侧
            let index = -1
            breadcrumbList.forEach((item, i) => {
                if (item.key === this.state.activeKey) {
                    index = i;
                }
            })

            if (index !== -1) {
                console.log(index, breadcrumbList.length)

                breadcrumbList.splice(index + 1, breadcrumbList.length - index)
                this.setActiveKey(breadcrumbList[breadcrumbList.length - 1].key)
                this.onChange(breadcrumbList[breadcrumbList.length - 1].key)
                this.setState({
                    breadcrumbList: breadcrumbList
                })
            }


        } if (key === '4') {
            this.setState({
                breadcrumbList: []
            })
            window.location.hash = "/"
        }
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
                                        mode="inline"
                                        theme='dark'
                                        defaultSelectedKeys={['1']}
                                        items={
                                            this.handleMenus(Menus)
                                        }
                                    />
                                </Sider>
                                <Layout className="site-layout" >
                                    <Header
                                        className="site-layout-background header-div-container"
                                        style={{
                                            padding: 0,
                                        }}
                                    >
                                        <div className='header-div'>
                                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                                className: 'trigger',
                                                onClick: () => {
                                                    this.setState({
                                                        collapsed: !this.state.collapsed
                                                    })
                                                },
                                            })}

                                            <div className='content-tabs header-div-left'>
                                                {
                                                    <Tabs hideAdd onChange={this.onChange.bind(this)} activeKey={this.state.activeKey}
                                                        type="editable-card" onEdit={this.onEdit.bind(this)}
                                                        tabPosition={'top'}
                                                        tabBarGutter={3}
                                                        tabBarExtraContent={
                                                            this.state.breadcrumbList.length > 0 ?
                                                                <Menu mode="horizontal"
                                                                    onClick={({ key }) => {
                                                                        message.success(`关闭了${key}`)
                                                                        this.handCloseTabs(key);
                                                                    }}
                                                                    items={[
                                                                        {
                                                                            key: '0',
                                                                            label: <div>
                                                                                关闭标签 <StopOutlined />
                                                                            </div>,
                                                                            children: [
                                                                                {
                                                                                    key: '1',
                                                                                    label: '关闭标签',
                                                                                },
                                                                                {
                                                                                    key: '2',
                                                                                    label: '关闭其他标签',
                                                                                },
                                                                                {
                                                                                    key: '3',
                                                                                    label: '关闭右侧标签',
                                                                                },
                                                                                {
                                                                                    key: '4',
                                                                                    label: '关闭全部标签',
                                                                                },
                                                                            ]
                                                                        }
                                                                    ]}
                                                                >
                                                                </Menu> : ''
                                                        }
                                                    >
                                                        {
                                                            this.state.breadcrumbList.map((pane) => (
                                                                <TabPane tab={pane.title
                                                                    // <Menu mode="horizontal"
                                                                    //     style={{ height: '100%' }}
                                                                    //     onClick={({ key }) => {
                                                                    //         message.success(`关闭了${key}`)
                                                                    //         this.handCloseTabs(key);
                                                                    //     }}
                                                                    //     items={[
                                                                    //         {
                                                                    //             key: '0',
                                                                    //             label: <div> {pane.title}
                                                                    //             </div>,
                                                                    //             children: [
                                                                    //                 {
                                                                    //                     key: '1',
                                                                    //                     label: '关闭标签',
                                                                    //                 },
                                                                    //                 {
                                                                    //                     key: '2',
                                                                    //                     label: '关闭其他标签',
                                                                    //                 },
                                                                    //                 {
                                                                    //                     key: '3',
                                                                    //                     label: '关闭右侧标签',
                                                                    //                 },
                                                                    //                 {
                                                                    //                     key: '4',
                                                                    //                     label: '关闭全部标签',
                                                                    //                 },
                                                                    //             ]
                                                                    //         }
                                                                    //     ]}
                                                                    // >
                                                                    // </Menu>
                                                                } key={pane.key}>
                                                                </TabPane>
                                                            ))
                                                        }
                                                    </Tabs>
                                                }
                                            </div>
                                            <div className='header-div-right'>
                                                {/* <span>
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
                                                </span> */}
                                                <span>
                                                    <Menu selectedKeys={this.state.activeKey} mode="horizontal" items={
                                                        this.handleMenus(TopeMenus)
                                                    } />
                                                </span>
                                            </div>
                                        </div>
                                    </Header>
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            margin: '15px 10px',
                                            minHeight: 280,
                                        }}
                                    >
                                        <div className='div-router-main'>
                                            <HashRouter>
                                                <Routes>
                                                    {
                                                        Routers.map((item) => {
                                                            return <Route key={item.path} path={item.path}
                                                                exact={item.exact} element={item.element}
                                                            ></Route>
                                                        })
                                                    }
                                                </Routes>
                                            </HashRouter>
                                        </div>
                                    </Content>
                                    <Affix className='affix-div-container' offsetBottom={this.state.bottom}>
                                        <div className='affix-div'>
                                            <a href='/#' onClick={() => {
                                                Modal.success({
                                                    title: 'WeiXin联系',
                                                    content: <div>微信联系...</div>
                                                })
                                            }}>
                                                <WechatOutlined />
                                            </a>
                                            <a href='/#'>
                                                <QqOutlined onClick={() => {
                                                    Modal.success({
                                                        title: 'QQ联系',
                                                        content: <div>QQ联系...</div>
                                                    })
                                                }} />
                                            </a>
                                        </div>
                                    </Affix>
                                    <Footer style={{ textAlign: 'center' }}>xx xx ©2022 create by tsc</Footer>
                                </Layout>
                            </Layout>
                            :
                            <Login>

                            </Login>
                    }
                </div>
            </ConfigProvider >
        )
    }
}
export default App;                                                                                                 