// 注册路由
import Home from '../components/home'
import Zora from '../components/zora'
import MintPage from '../components/mint'
import { Navigate } from 'react-router-dom'

export default [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/mint',
        element: <MintPage />
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