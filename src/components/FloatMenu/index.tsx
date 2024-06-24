import './index.scss'
import { FloatButton } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

export default function FloatMenu() {
    return (
        <>
            {window.location.pathname !== (process.env.NODE_ENV == 'development' ? '/home' : '/YunGui/home') ? <FloatButton tooltip='首页' icon={<HomeOutlined />} href={process.env.NODE_ENV == 'development' ? '/' : '/YunGui/'} /> : ''}
        </>
    )
}