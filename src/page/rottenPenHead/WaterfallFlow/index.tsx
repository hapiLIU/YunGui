import './index.scss'
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import data from './xhsData.json'
import { getRandomColorHEX } from '../../../services/hooks/practicalMethod';

export interface ICardItem {
    id: string | number;
    width: number;
    height: number;
    x: number;
    y: number;
    display_title: string;
    user: {
        nick_name: string,
        avatar: string,
        user_id: string | number,
        nickname: string
    }
}

export interface IWaterFallProps {
    gap: number; // 卡片间隔
    column: number; // 瀑布流列数
    bottom: number; // 距底距离（触底加载更多）
    pageSize: number;
}

export default function WaterfallFlow() {
    const [loading, setLoading] = useState(false)
    let xhsData: any[] = []
    const porps: IWaterFallProps = {
        gap: 20,
        column: 5,
        bottom: 50,
        pageSize: 1,
    }
    let columnHeight: number[] = new Array(porps.column).fill(0)
    const divRef = useRef<HTMLDivElement>(null);
    const [handleData, setHandleData] = useState<ICardItem[]>([])

    // 用来存储窗口resize事件的处理函数
    let resizeHandler: () => void;

    const measure = () => {
        if (divRef.current) {
            const containerWidth = divRef.current.clientWidth - (divRef.current.offsetWidth - divRef.current.clientWidth);
            if (containerWidth > 0) {
                const cardWidth = (containerWidth - ((porps.column - 1) * porps.gap)) / porps.column
                const data: ICardItem[] = []
                xhsData.forEach(item => {
                    let content = {
                        id: item.id,
                        width: cardWidth,
                        height: (cardWidth * item.note_card.cover.height) / item.note_card.cover.width,
                        x: 0,
                        y: 0,
                        display_title: item.note_card.display_title,
                        user: item.note_card.user
                    }
                    data.push(content)
                })
                data.map(item => {
                    // 获取最小列及其高度
                    let minValue = Math.min(...columnHeight);
                    let minIndex = columnHeight.findIndex(number => number === minValue);
                    // 处理item X,Y 坐标
                    item.x = (porps.gap / 2) + minIndex * (cardWidth + porps.gap)
                    if (minIndex + 1 == columnHeight.length) { item.x -= (porps.gap / 2) }
                    item.y = minValue

                    columnHeight[minIndex] += item.height + 10

                    return item
                })
                setHandleData(data)
            }
        }
    }
    // 当组件挂载时执行测量
    useEffect(() => {
        getCardList()
        measure();
        // 添加窗口resize事件监听
        // resizeHandler = () => {
        //     measure();
        // };
        // window.addEventListener('resize', resizeHandler);
        // 清除函数，组件卸载时执行
        // return () => {
        //     window.removeEventListener('resize', resizeHandler);
        // };
    }, []);
    // useEffect(() => {
    //     const container = divRef.current;
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll);
    //     }
    //     return () => {
    //         if (container) {
    //             container.removeEventListener('scroll', handleScroll);
    //         }
    //     };
    // }, [])

    // 获取数据
    const getCardList = async () => {
        const list = data.data.items;
        xhsData = [...xhsData, ...list];
        console.log(xhsData)
    };

    // 触底加载
    // const handleScroll = () => {
    //     if (divRef.current) {
    //         const { scrollTop, clientHeight, scrollHeight } = divRef.current;
    //         if (clientHeight + scrollTop + porps.bottom >= scrollHeight && !loading) {
    //             setLoading(true);
    //             getCardList();
    //         }
    //     }
    // };

    return (
        <div ref={divRef} className='waterfall-container'>
            <div className='waterfall-list'>
                {handleData.map(item => {
                    // console.log(handleData)
                    return <div className='waterfall-item' style={{ width: item.width, height: item.height, backgroundColor: getRandomColorHEX(), left: item.x, top: item.y }}>{item.display_title}</div>
                })}
            </div>
        </div>
    )
}

