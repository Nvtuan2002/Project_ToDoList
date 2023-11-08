import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
import {
    Button,
    Form,
    Input,
    Switch,
} from 'antd';

export default function DetailTask() {

    const params = useParams()
    const [task, setTask] = useState()
    const [form] = Form.useForm();
    const navigate = useNavigate()


    const onFinish = (values) => {
        console.log(values);
        let token = localStorage.getItem('token')
        axios({
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}?populate=*`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: {
                "data": {
                    "title": values.title,
                    "complete": values.complete,
                }
            }
        }).then((res) => {
            console.log('Update thanh cong');
        }).catch(() => {
            console.log('Update that bai');
        })
    };

    useEffect(() => {
        axios({
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}?populate=*`,
            method: 'get',
        }).then((res) => {
            setTask(res.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (<>
        <div className="detail-task">
            <h1>Id: {task?.id}</h1 >
            <h1>Complete: {`${task?.attributes?.complete}`}</h1 >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name='title'
                    label='Title'
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item name='complete' valuePropName='defaultChecked'>
                    <Switch checkedChildren="True" unCheckedChildren="False" defaultChecked={`${task?.attributes?.complete}`} />
                </Form.Item>
                <Button type='primary' htmlType='submit' style={{ marginRight: 10 }}>Sửa Task</Button>
                <Button onClick={() => {
                    navigate('/tasklist')
                }}>Quay lại</Button>
            </Form>
        </div>
    </>)
}
