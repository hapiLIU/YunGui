import { useEffect, useState } from 'react';
import './index.scss';
import { Button, Tooltip } from 'antd';
import { LogoutOutlined, RedoOutlined } from '@ant-design/icons';
import Cards from './components/cards';
import { Spades, RedPeach, Block, PlumBlossom, King } from './config/pokerData'

interface CardsData {
    id: number,
    pokerNum: string,
    pokerDecor: string,
    color: string,
    cardsFace: boolean
}

const PlayingCards = () => {
    const [pokerData, setPokerData] = useState<CardsData[]>([]) // 总卡牌数据
    const [areaPoker, setAreaPoker] = useState<CardsData[][]>([[], [], [], [], [], [], [], [], [], []]) // 区域卡牌数据

    useEffect(() => {
        // setPokerData([...Spades, ...RedPeach, ...Block, ...PlumBlossom, ...King])
        // setPokerData([...Spades])
        // setPokerData([...King])

        let copyAreaPoker = [...areaPoker]
        copyAreaPoker[0] = [{ "id": 1, "pokerNum": "A", "pokerDecor": "♠", "color": "black", "cardsFace": false },
        { "id": 2, "pokerNum": "2", "pokerDecor": "♠", "color": "black", "cardsFace": true },]
        copyAreaPoker[1] = [{ "id": 1, "pokerNum": "A", "pokerDecor": "♠", "color": "black", "cardsFace": false },
        { "id": 2, "pokerNum": "2", "pokerDecor": "♠", "color": "black", "cardsFace": false }, { "id": 3, "pokerNum": "3", "pokerDecor": "♠", "color": "black", "cardsFace": false },
        { "id": 4, "pokerNum": "4", "pokerDecor": "♠", "color": "black", "cardsFace": true },]
        setAreaPoker(copyAreaPoker)
    }, [])


    return (
        <div className="cardsIndex">
            <div className="cardsMenu">
                <Tooltip placement="right" title={<span style={{ color: "#000" }}>回首页</span>} color={'#fff'}>
                    <Button className='cardsMenuBtn'><LogoutOutlined /></Button>
                </Tooltip>
                <Tooltip placement="right" title={<span style={{ color: "#000" }}>重新对局</span>} color={'#fff'}>
                    <Button className='cardsMenuBtn'><RedoOutlined /></Button>
                </Tooltip>
            </div>
            <div className="cardsContent">
                <div className='placementArea'>
                    {areaPoker.map((item, i) => {
                        return (
                            // <div key={'area' + i} style={{ display: "flex", flexDirection: 'column', position: "relative", width: 150 }}>
                            //     {item.length > 0 ? (
                            //         <>
                            //             {item.map((items, index) => {
                            //                 return (<Cards key={items.id + items.pokerDecor} data={items} style={{ top: `${index * 20}px`, left: `0px` }} />)
                            //             })}
                            //         </>
                            //     )
                            //         : (
                            //             <div className='bgArea'></div>
                            //         )}
                            // </div>
                            <div key={'area' + i} style={{ display: "flex", flexDirection: 'column', position: "relative", width: 150 }}>

                                <div className='bgArea'></div>
                                {item.map((items, index) => {
                                    return (<Cards key={items.id + items.pokerDecor} data={items} style={{ top: `${index * 20}px`, left: `0px` }} />)
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