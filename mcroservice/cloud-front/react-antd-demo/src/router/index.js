import Home from './../pages/Home';
import Login from '../pages/user/Login';
import UserInfo from '../pages/user/UserInfo'

 const router = [
    {
        path : '/' ,
        exact : true ,
        element : <Home />
    },
    {
        path : '/home' ,
        exact : true ,
        element : <Home />
    },
    {
        path : '/user/login' ,
        exact : true ,
        element : <Login />
    },
    {
        path : '/user/info' ,
        exact : true ,
        element : <UserInfo />
    }
];

export default router
