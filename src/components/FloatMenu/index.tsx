import './index.scss'
import { FloatButton } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

export default function FloatMenu() {
    return (
        <>
            {window.location.pathname !== '/' ? <FloatButton tooltip='首页' icon={<HomeOutlined />} href='/' /> : ''}
        </>
    )
}