import FloatMenu from '../FloatMenu'
import './index.scss'

import React, { useState } from 'react';
import { BulbOutlined, HighlightOutlined, UnderlineOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import PracticeUI from './PracticeUI';
import FontComparison from './FontComparison';
import BinarySearch from './BinarySearch';

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
    getItem('新东西', 'NewKnowledge', <BulbOutlined />, [
        getItem('二分查找', 'BinarySearch')
    ]),
];

export default function RottenPenHead() {
    // 导航栏及其他数据
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState('PracticeUI');
    const [collapsed, setCollapsed] = useState(false);

    // 导航栏及其他数据所使用方法
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        console.log(e.key)
    };
    return (
        <div className='page'>
            <div className='top'>
                好记性不如烂笔头
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
                    <div style={{ width: "100%", height: "100%", display: current == 'BinarySearch' ? '' : 'none' }}>
                        <BinarySearch />
                    </div>
                </div>
            </div>
            <FloatMenu />
        </div>
    )
}