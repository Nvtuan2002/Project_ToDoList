import {
    Form,
    Input,
    Button
} from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
    const navigate = useNavigate()
    let token = localStorage.getItem('token')
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
                <Button type='primary' htmlType='submit'>Thêm Task</Button>
                <Button onClick={() => {
                    navigate('/tasklist')
                }}>Quay lại</Button>
            </Form>
        </div>
    </>)
}