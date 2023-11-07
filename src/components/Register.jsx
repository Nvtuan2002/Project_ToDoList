import React from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng ký thành công',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Đăng ký thất bại',
        });
    };

    const onFinish = (values => {
        console.log(values);
        let config = {
            method: 'post',
            url: 'https://backoffice.nodemy.vn/api/auth/local/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": values.identifier,
                "email": values.email,
                "password": values.password,
                "role": 3
            }
        };
        axios.request(config)
            .then((res) => {
                success()
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            })
            .catch((err) => {
                error()
            });
    })

    return (
        <>
            <h1 onClick={() => {
                navigate('/ProjectDoList')
            }} role="button" style={{ fontFamily: 'sans-serif' }}>DEMO CRUD</h1>
            <div className="login">
                <div className="register-form">
                    <Form
                        form={form}
                        name='registerForm'
                        onFinish={onFinish}
                    >
                        <h1>Đăng Ký</h1>
                        {contextHolder}
                        <Form.Item
                            label="Username"
                            name="identifier"

                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"

                            rules={[
                                {
                                    type: "email",
                                    required: true,
                                    message: 'Vui lòng điền đầy đủ thông tin!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền đầy đủ mật khẩu!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="ngaysinh"
                            label="Ngày sinh"
                        >
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form>
                </div>
                <Button onClick={() => {
                    navigate('/login')
                }}>Đăng nhập</Button>
            </div>

        </>
    );
}

export default Register;
