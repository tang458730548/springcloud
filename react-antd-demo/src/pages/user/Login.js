import React, { Component } from 'react';
import { Button, Space, Spin, Row, Col, Input, Form, message, Checkbox } from 'antd';
import Footer from '../../component/layout/Footer';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
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

    onFinish() {
        message.success(`登录成功！`)
    }

    onFinishFailed() {
        message.success(`登录失败！`)
    }


    render() {
        const labelCol = {
            span: 8,
        }
        const wrapperCol = {
            offset: 8,
            span: 8,
        }
        return (
            <div className='login-main'>
                <div className='right-login'>
                    <div className='login-title'>
                        <div className='logo'>
                            <img className='logo-img' src='./../../favicon.ico1'></img>
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
                                            message: 'Please input your username!',
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
                                            message: 'Please input your password!',
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
                                        offset: 8,
                                        span: 12,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
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