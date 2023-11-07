import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/Login.jsx'
import TaskList from './components/TaskList.jsx'
import './config/axios.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './components/Register.jsx'
import PrivateRouter from './components/PrivateRouter.jsx'
import AddTask from './components/AddTask.jsx'
import DetailTask from './components/DetailTask.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/tasklist",
    element: <PrivateRouter>
      <TaskList></TaskList>
    </PrivateRouter>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/add",
    element: <PrivateRouter>
      <AddTask></AddTask>
    </PrivateRouter>,
  },
  {
    path: "/task/:id",
    element: <PrivateRouter>
      <DetailTask></DetailTask>
    </PrivateRouter>,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
