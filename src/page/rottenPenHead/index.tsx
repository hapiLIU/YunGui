import FloatMenu from '../../components/FloatMenu'
import './index.scss'

import React, { useEffect, useState } from 'react';
import { BorderInnerOutlined, FileTextOutlined, HighlightOutlined, QuestionCircleOutlined, UnderlineOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Image } from 'antd';
import PracticeUI from './PracticeUI';
import FontComparison from './FontComparison';

import remarkData from './remark.json'

import ReadMarkDown from './ReadMarkDown';
import AuthHttpServices from '../../services/http/authHttpServices';
import Canvas from './canvas';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('UI组件练习', 'PracticeUI', <UnderlineOutlined />,),
    getItem('字体样式对比', 'FontComparison', <HighlightOutlined />,),
    getItem('MarkDown', 'markdown', <FileTextOutlined />,),
    getItem('Canvas', 'canvas', <BorderInnerOutlined />,),
    getItem('测试', 'test', <QuestionCircleOutlined />,),
];

export default function RottenPenHead() {
    // 导航栏及其他数据
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState('PracticeUI');
    const [collapsed, setCollapsed] = useState(false);

    const [randomRemark, setRandomRemark] = useState('')

    // 导航栏及其他数据所使用方法
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    useEffect(() => {
        let num = remarkData.remark.length
        let random = Math.floor(Math.random() * num)
        setRandomRemark(remarkData.remark[random])
    }, [])

    const MyComponent = async () => {
        let data = {
            account: 'YG12138',
            password: "00816"
        }
        const item = await AuthHttpServices.authLogin(data)
        console.log(item)
        const items = await AuthHttpServices.getUserById(12)
        console.log(items)
    };

    return (
        <div className='page'>
            <div className='top'>
                <div className="logo">
                    <Image className='icon' src={require("../../image/logo/logo2.png")} preview={false} />
                </div>
                <div className="remark">
                    <div className='remark-title'>好记性不如烂笔头</div>
                    <div className='remark-content'>{randomRemark}</div>
                </div>
            </div>
            <div className='content'>
                <div className='RottenPenHead-menu'>
                    <Menu
                        mode="inline"
                        style={{ height: "100%" }}
                        items={items}
                        onClick={onClick}
                        selectedKeys={[current]}
                        inlineCollapsed={collapsed}
                    />
                </div>
                <div className='RottenPenHead-main'>
                    <div style={{ width: "100%", height: "100%", display: current == 'PracticeUI' ? '' : 'none' }}>
                        <PracticeUI />
                    </div>
                    <div style={{ width: "100%", height: "100%", display: current == 'FontComparison' ? '' : 'none' }}>
                        <FontComparison />
                    </div>
                    <div style={{ width: "100%", height: "100%", display: current == 'markdown' ? '' : 'none' }}>
                        <ReadMarkDown />
                    </div>
                    <div style={{ width: "100%", height: "100%", display: current == 'canvas' ? '' : 'none' }}>
                        <Canvas />
                    </div>
                    <div style={{ width: "100%", height: "100%", display: current == 'test' ? '' : 'none' }}>
                        <Button onClick={MyComponent}>测试</Button>
                    </div>
                </div>
            </div>
            <FloatMenu />
        </div>
    )
}