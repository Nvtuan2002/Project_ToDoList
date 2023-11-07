import axios from "axios"
import { useEffect, useState } from "react"
import { Avatar, List, Input, Button, Dropdown, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";


function TaskList() {
    const [CV, setCV] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios({
            url: 'https://backoffice.nodemy.vn/api/tasks?populate=*',
            method: "GET",
        })
            .then((res) => {
                setCV(res.data.data);
                return res.data.data;
            })
            .then((data) => {
                setCV(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const deleteTask = (id) => {
        let token = localStorage.getItem('token')
        axios({
            url: `https://backoffice.nodemy.vn/api/tasks/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            console.log('Xoa thanh cong');
            let newList = CV.filter(item => {
                return item.id != id;
            })
            return newList
        }).then((data) => {
            setCV(data)
        }).catch((err) => {
            console.log('Xoa that bai');
        });
    }

    const onSearch = (values) => {
        let token = localStorage.getItem('token')
        let config = {
            method: 'get',
            url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=10&filters[$or][0][id][$contains]=${values.value}&filters[$or][1][title][$contains]=${values.value}`,
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        };

        axios.request(config)
            .then((res) => {
                console.log(values.value);
                setCV(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (<>
        <h1 onClick={() => {
            navigate('/ProjectDoList')
        }} role="button" style={{ fontFamily: 'sans-serif' }}>DEMO CRUD</h1>
        <div className="tasklist">
            <Button className="logout" type="primary" onClick={() => {
                localStorage.clear();
                navigate('/login')
            }}>Đăng xuất</Button>

            <Button className="addtask" type="primary" onClick={() => {
                navigate('/add')
            }}>Thêm Task mới</Button>
            <br />

            <div>
                <Form
                    onFinish={onSearch}
                >
                    <Form.Item
                        style={{ width: 300, display: 'inline-block' }}
                        name='value'
                    >
                        <Input></Input>
                    </Form.Item>
                    <Button type='primary' danger htmlType='submit'>Tìm kiếm</Button>
                </Form>
            </div>

            <h1>Danh sách công việc</h1>
            <List
                itemLayout="horizontal"
                dataSource={CV}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={'https://backoffice.nodemy.vn' + item?.attributes?.image?.data?.attributes.url} />}
                            title={item?.id}
                            description={item?.attributes.title}
                        />
                        <Dropdown.Button
                            style={{ width: 'unset' }}
                            dropdownRender={() => {
                                return (<>
                                    <div style={{ border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'start', borderRadius: '5px' }}>
                                        <Button style={{ border: 'none', width: 130, textAlign: 'start', marginBottom: 2 }} icon={<UserOutlined />} onClick={() => {
                                            deleteTask(item?.id)
                                        }} >Xóa</Button>
                                        <Button style={{ border: 'none', width: 130, textAlign: 'start' }} icon={<UserOutlined />} onClick={() => {
                                            navigate(`/task/${item?.id}`)
                                        }} >Xem chi tiết</Button>
                                    </div>
                                </>
                                )
                            }}>
                            More
                        </Dropdown.Button>
                    </List.Item >
                )
                }
            />
        </div>
    </>)
}

export default TaskList;