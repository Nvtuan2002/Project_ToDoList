import './App.css'
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';

function App() {
  const navigate = useNavigate();

  let token = localStorage.getItem('token')

  const logOut = <Button className="logout" type="primary" style={{ margin: 10 }} onClick={() => {
    localStorage.clear();
    navigate('/login')
  }}>Đăng xuất</Button>

  const noToken = <div className="App">
    <Button type="primary" danger size='large' onClick={() => {
      navigate('/login')
    }}>Đăng nhập</Button>

    <Button size='large' onClick={() => {
      navigate('/register')
    }}>Đăng ký</Button>
  </div>

  return (<>
    <h1 onClick={() => {
      navigate('/Project_ToDoList')
    }} role="button" style={{ fontFamily: 'sans-serif', float: 'left' }}>DEMO CRUD</h1>
    {!token ? noToken : logOut}

    <div className="Home">
      <Button size='large' onClick={() => {
        navigate('/tasklist')
      }}>Danh sách công việc</Button>
    </div>
  </>)
}

export default App
