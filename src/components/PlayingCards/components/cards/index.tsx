import { useState } from 'react'
import './index.scss'

interface CardsData {
    id: number,
    pokerNum: string,
    pokerDecor: string,
    color: string,
    cardsFace: boolean
}

const Cards = (props: { data: CardsData, style?: any }) => {
    const [item, setItme] = useState<CardsData>(props.data)

    return (
        <div className='cards' draggable style={props.style}>
            <div className='cardsFront' style={{ display: item.cardsFace ? '' : 'none', color: item.color }}>
                <div className='pokerNumTop'>{item.pokerNum == 'JOKER' ? (<><span>J</span><span>O</span><span>K</span><span>E</span><span>R</span></>) : item.pokerNum}</div>
                <div className='pokerDecorMiddle'>{item.pokerDecor}</div>
                <div className='pokerNumBottom'>{item.pokerNum == 'JOKER' ? (<><span>J</span><span>O</span><span>K</span><span>E</span><span>R</span></>) : item.pokerNum}</div>
            </div>
            <div className='cardsReverse' style={{ display: !item.cardsFace ? '' : 'none' }}></div>
        </div>
    )
}

export default Cards