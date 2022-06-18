import Home from './../pages/Home';
import Login from '../pages/user/Login';

const router = [
    {
        path : '/home' ,
        exact : true ,
        element : <Home />
    },
    {
        path : '/user/login' ,
        exact : true ,
        element : <Login />
    }
]

export default router;
