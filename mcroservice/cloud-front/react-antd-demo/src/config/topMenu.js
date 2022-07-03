import {
    UserOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
const topMenu = [
    {
        label: '消息中心',
        key: 'mail',
        router : '/user/info',
        icon: <MailOutlined />,
    },
    {
        label: '设置',
        key: 'SubMenu',
        icon: <UserOutlined />,
        children: [
            {
                label: '个人中心',
                key: 'setting:1',
                router : '/user/info'
            },
            {
                label: '修改密码',
                key: 'setting:2',
            },
            {
                label: (
                    <div onClick={() => {
                        window.sessionStorage.removeItem('session')
                        message.success(`退出登录成功！`)
                        setTimeout(() => {
                            window.location.hash = '#/'
                            window.location.reload()
                        }, 1000);
                    }}>退出登录</div>
                ),
                onClick : true,
                key: 'setting:3',
            },
        ],
    },
]

export default topMenu;