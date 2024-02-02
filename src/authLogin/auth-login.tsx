import { useEffect, useState } from 'react';
import Cloud from '../components/Cloud'
import './auth-login.scss'
import { Button, Form, Image, Input } from 'antd';

export default function AuthLogin() {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-menu'>
            <div className='login-bg'>
                <div className='cloud2' style={{ top: "5%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(12 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='medium' direction='left' />
                </div>
                <div className='cloud1' style={{ top: "15%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(10 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='small' />
                </div>
                <div className='cloud2' style={{ top: "25%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(12 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='medium' direction='left' />
                </div>
                <div className='cloud1' style={{ top: "35%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(10 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='small' />
                </div>
                <div className='cloud1' style={{ top: "40%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(15 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='large' />
                </div>
                <div className='cloud1' style={{ top: "65%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(12 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='medium' />
                </div>
                <div className='cloud2' style={{ top: "75%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(10 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='small' direction='left' />
                </div>
                <div className='cloud1' style={{ top: "88%", animationDelay: `${(Math.random() * 3) + "s"}`, animationDuration: `${(12 + Math.random() * 3) + "s"}` }}>
                    <Cloud size='medium' />
                </div>
            </div>
            <div className='login-form'>
                <Image className='icon' src={require("../image/logo/logo1.png")} preview={false} />
                <div className='form-content'>
                    <h2>登录</h2>
                    <Form
                        name="basic"
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入账号!' }]}
                        >
                            <Input placeholder="账号" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password placeholder="密码" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#009fdc" }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}