import React from 'react';
import { Button, Form, Input, DatePicker, message } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng nhập thành công',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Đăng nhập thất bại',
        });
    };

    const onFinish = (values => {
        axios({
            url: '/auth/local',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: values
        }).then((res) => {
            success()
            localStorage.setItem('token', res.data.jwt) // lưu token và user
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setTimeout(() => {
                navigate('/tasklist')
            }, 1000)

        }).catch((err) => {
            error()
        });
    })

    return (<>
     <h1 onClick={() => {
            navigate('/Project_ToDoList')
        }} role="button" style={{ fontFamily: 'sans-serif' }}>DEMO CRUD</h1>
        <div className='login'>
            <div className='login-form'>
                <Form
                    form={form}
                    name='loginForm'
                    onFinish={onFinish}
                >
                    <h1>Đăng nhập</h1>
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
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền đầy đủ thông tin!',
                            },
                        ]}
                    >
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form>
            </div>
            <div>
                <Button onClick={() => {
                    navigate('/register')
                }}>Đăng ký</Button>
                <Button onClick={() => {
                    form.setFieldsValue({
                        identifier: 'tuan@gmail.com',
                        password: '123456',
                        ngaysinh: dayjs("03/09/2002", "DD/MM/YYYY") // Specify the date format
                    });
                }}>
                    Điền đầy đủ thông tin
                </Button>
            </div>
        </div>
    </>
    );
}

export default Login;
