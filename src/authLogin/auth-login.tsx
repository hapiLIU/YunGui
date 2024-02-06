import { useEffect, useState } from 'react';
import './auth-login.scss'
import { Button, DatePicker, Form, Image, Input } from 'antd';
import AuthHttpServices from '../services/http/authHttpServices';
import { authModel } from '../models/auth.http.model';
import TokenService from '../services/auth/token.service';
import UserService from '../services/auth/user.service';

export default function AuthLogin() {
    const [sign, setSign] = useState<"in" | "up">('in') // 表单选择，登录 or 注册

    const [accountStatus, setAccountStatus] = useState<'success' | 'warning' | 'error' | 'validating'>("validating")

    // 去登录
    const goSignIn = async (values: authModel) => {
        await AuthHttpServices.authLogin(values).then((item: any) => {
            console.log(item)
            if (item && item.data) {
                successLogin(item.data)
            } else {
                const error = '登录失败，请重试！'
                return
            }
        }).catch(error => {
            throw new Error('login failed：' + error); // 如果发生错误，抛出错误信息（可以根据需要自定义错误信息）
        })
    };
    // 登录成功
    const successLogin = async (data: any) => {
        const token = data["yungui-user-token"]
        const userId = data.id
        TokenService.setToken(token)
        await AuthHttpServices.getUserByUserId(userId).then(item => {
            if (item) {
                UserService.setUser(item)
            }
        })

    }

    // 去注册
    const goSignUp = (values: any) => {
        const [account, password, name, email, birthday] = values
        console.log(account, password, name, email, birthday);
    };
    // 验证账号是否存在
    const isAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        console.log(inputValue)
    }

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
                                validateStatus={accountStatus}
                                hasFeedback
                                rules={[{ required: true, message: '请输入账号!' }]}
                                style={{ width: "60%" }}
                            >
                                <Input placeholder="账号" onBlur={isAccount} />
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