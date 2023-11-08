import {
    Form,
    Input,
    Button
} from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddTask() {
    const navigate = useNavigate()
    let token = localStorage.getItem('token')
    const [isSubmitting, setIsSubmitting] = useState(false);
    function onFinish(values) {
        axios({
            url: 'https://backoffice.nodemy.vn/api/tasks',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            data: {
                "data": {
                    "title": values.title
                }
            }
        })
            .then((result) => {
                console.log('Tao moi thanh cong');
                setIsSubmitting(true);
            }).catch((err) => {
                console.log('Tao moi that bai');
            })
    }
    return (<>
        <div className='addTask'>
            <h1>Thêm title mới</h1>
            <Form
                onFinish={onFinish}
            >
                <Form.Item
                    label='Title'
                    name='title'
                >
                    <Input></Input>
                </Form.Item>
                <Button type='primary' htmlType='submit' disabled={isSubmitting}>Thêm Task</Button> {/* disable submit button based on state variable */}
                <Button onClick={() => {
                    navigate('/tasklist')
                }}>Quay lại</Button>
            </Form>
        </div>
    </>)
}