import { useEffect, useState } from 'react';
import './index.scss';
import { Button, Modal, Tooltip } from 'antd';
import { LogoutOutlined, RedoOutlined } from '@ant-design/icons';
import Cards from './components/cards';
import { Spades, RedPeach, Block, PlumBlossom, King } from './config/pokerData'
// 引入拖拽插件
import Draggable, { DraggableEvent } from 'react-draggable';
import { useNavigate } from 'react-router-dom';


interface CardsData {
    id: number,
    pokerNum: string,
    pokerDecor: string,
    color: string,
    cardsFace: boolean,
    isAllowDrag: boolean
}

const PlayingCards = () => {
    const [pokerData, setPokerData] = useState<CardsData[]>([]) // 总卡牌数据
    const [areaPoker, setAreaPoker] = useState<CardsData[][]>([[], [], [], [], [], [], [], [], [], []]) // 区域卡牌数据
    const [dragPoker, setDragPoker] = useState<number[]>([])   // 正在拖拽到卡牌ID
    const [pokerAreaKey, setPokerAreaKey] = useState<boolean>(true) // 卡牌区域的key

    const navigate = useNavigate()

    useEffect(() => {
        // let poker: CardsData[] = [...Spades, ...RedPeach, ...Block, ...PlumBlossom, ...King].map((item: any) => {
        //     item.isAllowDrag = true
        //     return item
        // })
        let poker: CardsData[] = [...Spades, ...Spades, ...Spades, ...Spades, ...Spades, ...Spades, ...Spades, ...Spades,].map((item: any) => {
            item.isAllowDrag = true
            return item
        })
        setPokerData([...poker])

        let copyAreaPoker: CardsData[][] = [[], [], [], [], [], [], [], [], [], []]
        let copyPokerData: CardsData[] = [...poker].sort(() => { return Math.random() > 0.5 ? -1 : 1 })
        console.log(poker)
        console.log(copyPokerData)

        let num = 0

        copyPokerData.forEach(item => {
            if (num < 9) {
                copyAreaPoker[num].push(item)
                num++
            } else {
                copyAreaPoker[num].push(item)
                num = 0
            }
        })
        console.log(copyAreaPoker)
        setAreaPoker(copyAreaPoker)


        // let copyAreaPoker = [...areaPoker]
        // copyAreaPoker[0] = [
        //     { "id": 1, "pokerNum": "A", "pokerDecor": "♠", "color": "black", "cardsFace": false, "isAllowDrag": false },
        //     { "id": 2, "pokerNum": "2", "pokerDecor": "♠", "color": "black", "cardsFace": true, "isAllowDrag": true },
        // ]
        // copyAreaPoker[1] = [
        //     { "id": 14, "pokerNum": "A", "pokerDecor": "♥", "color": "red", "cardsFace": false, "isAllowDrag": false },
        //     { "id": 15, "pokerNum": "2", "pokerDecor": "♥", "color": "red", "cardsFace": false, "isAllowDrag": false },
        //     { "id": 17, "pokerNum": "4", "pokerDecor": "♥", "color": "red", "cardsFace": true, "isAllowDrag": true },
        //     { "id": 16, "pokerNum": "3", "pokerDecor": "♥", "color": "red", "cardsFace": true, "isAllowDrag": true },
        // ]

        // setAreaPoker(copyAreaPoker)
    }, [])

    const [startX, setStartX] = useState<number>(0)  // 拖动卡牌的初始位置

    const mouseDownDrag = (data: CardsData) => { // 鼠标点击卡牌
        console.log(data)
        let pokerIndex: number = 0;
        let copyData = [...areaPoker]
        copyData.forEach((item, index) => {
            if (item.includes(data)) {
                pokerIndex = index
            }
        })
        if (copyData[pokerIndex].indexOf(data) != (copyData[pokerIndex].length - 1)) {
            console.log('禁止')

        } else {
            console.log(pokerIndex, copyData[pokerIndex].indexOf(data), (copyData[pokerIndex].length - 1))
        }
    }
    const dragStart = (event: any, id: number) => { // 开始拖动
        console.log('开始拖动', event)
        // console.log(id)
        setDragPoker([id])
        setStartX(event.clientX)
    }
    const handleDrag = (e: any, data: { x: any; y: any; }) => { // 拖动中
        // 拖动时触发的回调函数
        // console.log(data.x, data.y);
    };
    const dragStop = (event: any, data: CardsData) => { // 停止拖动
        console.log('停止拖动', event)

        // 开始拖动时
        const startIndex = Math.floor((startX > 0 ? startX : 0) / ((window.innerWidth - 50) / 10));
        // 停止拖动时
        const placementArea: any = document.getElementsByClassName('placementArea')
        const x = event.clientX - placementArea[0].clientLeft;
        const index = Math.floor((x > 0 ? x : 0) / ((window.innerWidth - 50) / 10));

        let copyData = [...areaPoker]
        copyData[startIndex] = copyData[startIndex].filter(item => {
            return dragPoker.indexOf(item.id) < 0
        })
        copyData[index].push(data)
        setPokerAreaKey(pre => !pre)
        setAreaPoker(copyData)

        setDragPoker([])
    }

    useEffect(() => {
        let copyData = [...areaPoker]
        copyData.map((item, i) => {
            item.map((items, j) => {
                if (items.cardsFace == false) {
                    return items.isAllowDrag = false
                }
                console.log(item.indexOf(items))
                if (item.indexOf(items) == (item.length - 1)) {
                    return items.isAllowDrag = true
                } else {
                    // 同一花色并且顺序正确
                    let sameColor: boolean = true
                    let pokerDecor = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A']
                    for (let i = item.indexOf(items); i <= (item.length - 1); i++) {
                        if (item[i + 1]) {
                            if ((item[i].pokerDecor != item[i + 1].pokerDecor) || (item[i].id < item[i + 1].id) || ((pokerDecor.indexOf(item[i].pokerNum) + 1) != pokerDecor.indexOf(item[i + 1].pokerNum))) {
                                sameColor = false
                            }
                        }
                    }
                    return items.isAllowDrag = sameColor
                }
            })
        })
        setPokerAreaKey(pre => !pre)
    }, [areaPoker])

    return (
        <div className="cardsIndex">
            <div className="cardsMenu">
                <Tooltip placement="right" title={<span style={{ color: "#000" }}>回首页</span>} color={'#fff'}>
                    <Button className='cardsMenuBtn' onClick={() => navigate(process.env.NODE_ENV == 'development' ? '/' : '/YunGui/')}><LogoutOutlined /></Button>
                </Tooltip>
                <Tooltip placement="right" title={<span style={{ color: "#000" }}>重新对局</span>} color={'#fff'}>
                    <Button className='cardsMenuBtn'><RedoOutlined /></Button>
                </Tooltip>
            </div>
            <Modal open={true} maskClosable={false} closeIcon={null} footer={<Button type="primary" onClick={() => navigate(process.env.NODE_ENV == 'development' ? '/' : '/YunGui/')}>回首页</Button>}>
                <div style={{ height: "100px", lineHeight: "100px" }}>此功能出现严重问题，暂时未修复完毕，请移步其他游戏</div>
            </Modal>
            <div className="cardsContent">
                <div className='placementArea' key={pokerAreaKey ? 'aa' : 'bb'}>
                    {areaPoker.map((item, i) => {
                        return (
                            <div key={'area' + i} style={{ display: "flex", flexDirection: 'column', position: "relative", width: 150 }}>

                                <div className='bgArea' ></div>
                                {item.map((items, index) => {
                                    return (
                                        <Draggable defaultClassNameDragging='draging' onMouseDown={() => mouseDownDrag(items)} onStart={(event) => dragStart(event, items.id)} onDrag={handleDrag} onStop={(event) => dragStop(event, items)} disabled={(!items.cardsFace || !items.isAllowDrag) ? true : false}>
                                            <div>
                                                <Cards key={items.id + items.pokerDecor} data={items} style={{ top: `${index * 40}px`, left: `0px` }} />
                                            </div>
                                        </Draggable>
                                    )
                                })}

                            </div>
                        )
                    })}
                </div>
                <div className='resultArea'></div>
            </div>
        </div>
    )
}
export default PlayingCards;