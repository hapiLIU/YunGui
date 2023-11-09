import './index.scss'
import { FloatButton } from 'antd'
import { EditOutlined, MenuOutlined, ReadOutlined, RocketOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function FloatMenu() {
    console.log(window.location.pathname)
    return (
        <>
            <FloatButton.Group
                trigger="hover"
                type="primary"
                icon={<MenuOutlined />}
            >
                {window.location.pathname !== '/' ? <FloatButton tooltip='去玩' icon={<RocketOutlined />} href='/' /> : ''}
                {window.location.pathname !== '/rottenPenHead' ? <FloatButton tooltip='去做' icon={<EditOutlined />} href='/rottenPenHead' /> : ''}
                {/* <FloatButton tooltip='去学' icon={<ReadOutlined />} href='/' /> */}
            </FloatButton.Group>
        </>
    )
}