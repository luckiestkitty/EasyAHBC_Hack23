// 注册路由
import Home from '../components/home'
import Zora from '../components/zora'
import { Navigate } from 'react-router-dom'

export default [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/zora',
        element: <Zora />
    },
    {
        path: '',
        element: <Navigate to="home"/>
    }
]