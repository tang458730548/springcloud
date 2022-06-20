import {
    UserOutlined,
} from '@ant-design/icons';

const menu = [

    {
        key: '1',
        icon: <UserOutlined />,
        label: '菜单一',
        children: [
            {
                key: '4',
                icon: <UserOutlined />,
                label: '菜单一.1',
                router : '/home',
                children : [
                    {
                        key: '6',
                        icon: <UserOutlined />,
                        label: '菜单一.1.1',
                        router : '/home3',
                    }
                ]
            },
            {
                key: '5',
                icon: <UserOutlined />,
                label: '菜单一.2',
                router : '/home2',
            }
        ]
    },
    {
        key: '2',
        icon: <UserOutlined />,
        label: '菜单5',
        router : '/user/info',
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: '菜单6',
        router : '/home',
    },
    {
        key: '7',
        icon: <UserOutlined />,
        label: '菜单7',
        router : '/user/info',
    },
    {
        key: '8',
        icon: <UserOutlined />,
        label: '菜单8',
        router : '/home',
    },
    {
        key: '9',
        icon: <UserOutlined />,
        label: '菜单9',
        router : '/user/info',
    },
    {
        key: '10',
        icon: <UserOutlined />,
        label: '菜单10',
        router : '/home',
    }
]

export default menu;