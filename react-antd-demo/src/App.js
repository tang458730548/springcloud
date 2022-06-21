import React, { Component } from 'react';
import { message, Layout, Menu, ConfigProvider, Radio, Tabs, Affix, Button } from 'antd';
import Login from './pages/user/Login'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    StopOutlined,
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
            current: undefined,
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
                                            <Menu selectedKeys={this.state.current} mode="horizontal" items={
                                                this.handleMenus(TopeMenus)
                                            } />
                                        </span>
                                    </Header>
                                    <Content
                                        className="site-layout-background"
                                        style={{
                                            margin: '25px 10px 0px',
                                            minHeight: 280,
                                        }}
                                    >
                                        <div className='content-tabs'>
                                        {   
                                            <Tabs hideAdd onChange={this.onChange.bind(this)} activeKey={this.state.activeKey}
                                                type="editable-card" onEdit={this.onEdit.bind(this)}
                                                tabPosition={'top'}
                                                tabBarStyle={{ margin: '0px 20px' }}
                                                tabBarGutter={3}
                                                tabBarExtraContent={
                                                    <Menu mode="horizontal"
                                                        onClick={({ key }) => {
                                                            message.success(`关闭了${key}`)
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
                                                    </Menu>
                                                }>
                                                {
                                                    this.state.breadcrumbList.map((pane) => (
                                                        <TabPane tab={pane.title} key={pane.key}>
                                                        </TabPane>
                                                    ))
                                                }
                                            </Tabs>
                                        }
                                        </div>
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
                                    </Content>
                                    {/* <Affix style={{ position: 'absolute', bottom : 160, right: 5 }} offsetBottom={this.state.bottom}>
                                        <Button type="primary" onClick={() => this.setState({
                                            bottom : this.state.bottom + 100
                                        })}>
                                            点击联系我们
                                        </Button>
                                    </Affix> */}
                                    <Footer style={{ textAlign: 'center' }}>xx xx ©2022 xxxxxxxxxx</Footer>
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