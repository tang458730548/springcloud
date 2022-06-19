import React, { Component } from 'react';
import { Button, Input, Form, message, Checkbox } from 'antd';
import Footer from '../../component/layout/Footer';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {

    }

    onFinish(values) {
        console.log(values)

        const userName = values.username
        const password = values.password

        if (userName !== 'admin' || password !== '123456') {
            message.warn(`用户名/密码为:admin/123456`)
            return
        }

        window.sessionStorage.setItem('session', JSON.stringify(values))

        this.setState({
            loading: true
        })

        setTimeout(() => {
            message.success(`登录成功！`)
            this.setState({
                loading: false
            })
            window.location.reload()
            window.location.hash = "#/"
        }, 1500);
    }

    onFinishFailed() {
        message.warn(`请输入用户名和密码！`)
    }


    render() {
        const labelCol = {
            span: 6,
        }
        const wrapperCol = {
            offset: 4,
            span: 16,
        }
        return (
            <div className='login-main'>
                <div className='right-login'>
                    <div className='login-title'>
                        <div className='logo'>
                            <img  alt="图像" className='logo-img' src='./../../favicon.ico'></img>
                            <span className='logo-span'>xxxxxxxxxxxx系统</span>
                        </div>
                        <div className='logo-nvg'>
                        </div>
                    </div>
                    <div className='login-content'>
                        <h2 style={{ paddingTop: '60px' }}>用户登录</h2>
                        <div className="root-login-modal">
                            <Form
                                name="basic"
                                labelCol={labelCol}
                                wrapperCol={{
                                    span: 12,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={this.onFinish.bind(this)}
                                onFinishFailed={this.onFinishFailed.bind(this)}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入用户名！',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入密码！',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    wrapperCol={wrapperCol}
                                >
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 6,
                                        span: 12,
                                    }}
                                >
                                    <Button type="primary" loading={this.state.loading} htmlType="submit" style={{ width: '100%' }}>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}
export default Login;