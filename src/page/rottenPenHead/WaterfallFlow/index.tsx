import './index.scss'
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import data from './xhsData.json'
import data2 from './xhsData2.json'
import { getRandomColorHEX } from '../../../services/hooks/practicalMethod';
import { Avatar } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { debounce } from '../../../services/hooks/performanceTool';

export interface ICardItem {
    id: string | number;
    originalHeight: number;  //  原先高度，后台传值
    originalWidth: number;  //  原先宽度，后台传值
    width: number;  //  卡片宽度
    imgHeight: number;  // 图片高度
    cardHeight: number;  // 卡片高度
    x: number;  //  定位left
    y: number;  //  定位top
    display_title: string;  //  小标题文字
    user: {     // 用户信息
        nick_name: string,
        avatar: string,
        user_id: string | number,
        nickname: string
    },
    interact_info: {    // 点赞
        liked: boolean,
        liked_count: string
    },
    color: string
}

export interface IWaterFallProps {
    gap: number; // 卡片间隔
    column: number; // 瀑布流列数
    bottom: number; // 距底距离（触底加载更多）
    pageSize: number;   //当前页数
    pageNum: number[];   //每页数量
}

export default function WaterfallFlow() {
    const [loading, setLoading] = useState(false)   //加载
    let xhsData: any[] = [] // 后台获取数据
    const porps: IWaterFallProps = {
        gap: 20,
        column: 6,
        bottom: 100,
        pageSize: 0,
        pageNum: []
    };
    let columnHeight: number[] = new Array(porps.column).fill(0)
    const divRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);
    const [handleData, setHandleData] = useState<ICardItem[]>([])   //  处理数据用于卡片定位及展示

    const [isUpdate, setIsUpdate] = useState(false) // 更新数据

    // 用来存储窗口resize事件的处理函数
    let resizeHandler: () => void;

    // 处理数据:计算图片高度
    const computedHeight = () => {
        if (divRef.current) {
            const containerWidth = divRef.current.clientWidth - (divRef.current.offsetWidth - divRef.current.clientWidth);
            if (containerWidth > 0) {
                const cardWidth = (containerWidth - ((porps.column - 1) * porps.gap)) / porps.column
                let computedData: ICardItem[] = []
                xhsData.forEach(item => {
                    let content = {
                        id: item.id,
                        originalHeight: item.note_card.cover.height,
                        originalWidth: item.note_card.cover.width,
                        width: cardWidth,
                        imgHeight: (cardWidth * item.note_card.cover.height) / item.note_card.cover.width,
                        cardHeight: 0,
                        x: 0,
                        y: 0,
                        display_title: item.note_card.display_title,
                        user: item.note_card.user,
                        interact_info: item.note_card.interact_info,
                        color: getRandomColorHEX()
                    }
                    computedData.push(content);
                })
                setHandleData([...handleData, ...computedData])

                // 处理数据:计算卡片高度
                setTimeout(() => {
                    let num = 0 //  前置数量
                    if (porps.pageSize > 0) {
                        for (let i = 0; i < porps.pageSize; i++) {
                            num += porps.pageNum[i]
                        }
                    }
                    if (itemRef.current && itemRef.current!.children.length > num) {
                        const children: any = itemRef.current!.children

                        setHandleData(pre => pre.map((item, index) => {
                            item.cardHeight = children[num + index]?.getBoundingClientRect()?.height ?? 0
                            // 获取最小列及其高度
                            let minValue = Math.min(...columnHeight);
                            let minIndex = columnHeight.findIndex(number => number === minValue);
                            // 处理item X,Y 坐标
                            item.x = (porps.gap / 2) + minIndex * (item.width + porps.gap);
                            if (minIndex + 1 == columnHeight.length) { item.x -= (porps.gap / 2) };
                            item.y = minValue;

                            columnHeight[minIndex] += item.cardHeight + 10;

                            return item;
                        }))
                    }
                })
            }
        }
    }
    // 视口变化自适应
    const viewChangeHandle = () => {
        columnHeight = new Array(porps.column).fill(0)
        if (divRef.current) {
            const containerWidth = divRef.current.clientWidth - (divRef.current.offsetWidth - divRef.current.clientWidth);
            const children: any = itemRef.current!.children
            if (containerWidth > 0) {
                const cardWidth = (containerWidth - ((porps.column - 1) * porps.gap)) / porps.column
                setHandleData(pre => pre.map((item, index) => {
                    item.width = cardWidth;
                    item.imgHeight = (cardWidth * item.originalHeight) / item.originalWidth;
                    item.cardHeight = children[index].getBoundingClientRect().height;

                    // 获取最小列及其高度
                    let minValue = Math.min(...columnHeight);
                    let minIndex = columnHeight.findIndex(number => number === minValue);
                    // 处理item X,Y 坐标
                    item.x = (porps.gap / 2) + minIndex * (item.width + porps.gap);
                    if (minIndex + 1 == columnHeight.length) { item.x -= (porps.gap / 2) };
                    item.y = minValue;

                    columnHeight[minIndex] += item.cardHeight + 10;

                    return item;
                }))
            }
        }
    }

    // 当组件挂载时执行测量
    useEffect(() => {
        if (isUpdate) {
            getCardList2()
        } else {
            getCardList()
        }
        computedHeight();


        // 添加窗口resize事件监听
        resizeHandler = () => {
            viewChangeHandle();
        };
        window.addEventListener('resize', resizeHandler);
        // 清除函数，组件卸载时执行
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, [isUpdate]);

    useEffect(() => {
        const container = divRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [])

    // 获取数据
    const getCardList = async () => {
        const list = data.data.items;
        xhsData = list
        if (porps.pageNum.length > 0) {
            porps.pageSize += 1
        }
        porps.pageNum.push(list.length)
    };
    // 获取数据2
    const getCardList2 = async () => {
        const list = data2.data.items;
        xhsData = list
        if (porps.pageNum.length > 0) {
            porps.pageSize += 1
        }
        porps.pageNum.push(list.length)
    };

    // 触底加载
    const handleScroll = debounce(() => {
        if (divRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = divRef.current;
            if (clientHeight + scrollTop + porps.bottom >= scrollHeight && !loading) {
                setLoading(true);

                setIsUpdate(pre => !pre)

                setLoading(false);
            }
        }
    }, 100);

    return (
        <div ref={divRef} className='waterfall-container'>
            <div className='waterfall-list' ref={itemRef} >
                {handleData.map((item, index) => {
                    return (
                        <div className='waterfall-item' style={{ width: item.width, left: item.x, top: item.y }}>
                            <div className='waterfall-item-image' style={{ width: item.width, height: item.imgHeight, backgroundColor: item.color, }}>

                            </div>
                            <div className='waterfall-item-footer' style={{ width: item.width }}>
                                <div className='title'>{item.display_title}</div>
                                <div className='author'>
                                    <div className='author-info'>
                                        <Avatar size={20} src={item.user.avatar} className='avatar' />
                                        <span className='name'>{item.user.nickname}</span>
                                    </div>
                                    <div className='like'>
                                        {item.interact_info.liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                                        <span style={{ marginLeft: 2 }}>{item.interact_info.liked_count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

