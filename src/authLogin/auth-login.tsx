import { useEffect, useState } from 'react';
import Cloud from '../components/Cloud'
import './auth-login.scss'
import { Button, DatePicker, Form, Image, Input } from 'antd';

export default function AuthLogin() {

    const [sign, setSign] = useState<"in" | "up">('in')

    // 去登录
    const goSignIn = (values: any) => {
        console.log('Success:', values);
    };
    // 去注册
    const goSignUp = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <div className='login-menu'>
            <div className='login-form'>
                <Image className='icon' src={require("../image/logo/logo1.png")} preview={false} />
                {sign == 'in' ? (
                    <div className='form-content'>
                        <h2>登录</h2>
                        <Form
                            name="basic"
                            style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                            initialValues={{ remember: true }}
                            onFinish={goSignIn}
                        >
                            <Form.Item
                                name="account"
                                rules={[{ required: true, message: '请输入账号!' }]}
                                style={{ width: "60%" }}
                            >
                                <Input placeholder="账号" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                                style={{ width: "60%" }}
                            >
                                <Input.Password placeholder="密码" />
                            </Form.Item>

                            <Form.Item style={{ width: "60%" }}>
                                <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#009fdc" }}>
                                    登录
                                </Button>
                            </Form.Item>

                            <div className='bottomIn'>
                                <div onClick={() => setSign("up")}>没有账号？前往注册</div>
                                <div>忘记密码？</div>
                            </div>
                        </Form>
                    </div>
                ) : (
                    <div className='form-content'>
                        <h2>注册</h2>
                        <Form
                            name="basic"
                            style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                            initialValues={{ remember: true }}
                            onFinish={goSignUp}
                        >
                            <Form.Item
                                name="account"
                                rules={[{ required: true, message: '请输入账号!' }]}
                                style={{ width: "60%" }}
                            >
                                <Input placeholder="账号" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                                style={{ width: "60%" }}
                            >
                                <Input.Password placeholder="密码" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                style={{ width: "60%" }}
                            >
                                <Input placeholder="昵称（选填）" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                style={{ width: "60%" }}
                            >
                                <Input placeholder="邮箱（选填）" />
                            </Form.Item>

                            <Form.Item
                                name="birthday"
                                style={{ width: "60%" }}
                            >
                                <DatePicker placeholder="生日（选填）" style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item style={{ width: "60%" }}>
                                <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#009fdc" }}>
                                    注册
                                </Button>
                            </Form.Item>

                            <div className='bottomUp'>
                                <div onClick={() => setSign("in")}>返回登录</div>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    )
}