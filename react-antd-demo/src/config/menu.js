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
        label: '菜单二',
        router : '/user/info',
    },
    {
        key: '3',
        icon: <UserOutlined />,
        label: '菜单三',
        router : '/home',
    }
]

export default menu;