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
        <div className='cards' style={props.style}>
            <div className='cardsFront' style={{ display: item.cardsFace ? '' : 'none', color: item.color }}>
                <div className='pokerNumTop'>{item.pokerNum == 'JOKER' ? (<div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}><span>J</span><span>O</span><span>K</span><span>E</span><span>R</span></div>) : <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}><span>{item.pokerNum}</span><span style={{ marginTop: -15 }}>{item.pokerDecor}</span></div>}</div>
                <div className='pokerDecorMiddle'>{item.pokerDecor}</div>
                <div className='pokerNumBottom'>{item.pokerNum == 'JOKER' ? (<div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}><span>J</span><span>O</span><span>K</span><span>E</span><span>R</span></div>) : <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}><span>{item.pokerNum}</span><span style={{ marginTop: -15 }}>{item.pokerDecor}</span></div>}</div>
            </div>
            <div className='cardsReverse' style={{ display: !item.cardsFace ? '' : 'none' }}></div>
        </div>
    )
}

export default Cards