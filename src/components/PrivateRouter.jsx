import { Navigate } from "react-router-dom"

export default function PrivateRouter(props) {
    let token = localStorage.getItem('token')

    if (token) {
        //da Dang nhap
        return props.children
    } else {
        // chua dang nhap
        return <Navigate to={'/Login'}></Navigate>
    }
}