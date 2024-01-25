import './index.scss'
import FloatMenu from '../components/FloatMenu'
import DesktopIcon from '../components/DesktopIcon'
import Watch from '../components/Watch'

import minesweeper from '../image/扫雷.jpg'
import sudoku from '../image/数独.jpg'
import gobang from '../image/五子棋.jpg'
import playingCards from '../image/纸牌.jpg'
import tankBattle from '../image/坦克.jpg'
import rottenPenHead from '../image/练习.jpg'
import threejs from '../image/threejs.jpg'
import chatRoom from '../image/聊天.jpg'
import { useEffect, useState } from 'react'
import { useHolidayAndSolarTerm } from '../services/hooks/perpetualCalendar'
import FallingFlowers from '../components/FallingFlowers'

export default function Home() {

    return (
        <div className='menu'>
            <FallingFlowers />
            <div className='time'>
                <Watch />
            </div>
            <div className='content'>
                <DesktopIcon icon={minesweeper} name='扫雷' route='/minesweeper'></DesktopIcon>
                <DesktopIcon icon={sudoku} name='数独' route='/sudoku'></DesktopIcon>
                <DesktopIcon icon={gobang} name='五子棋' route='/gobang'></DesktopIcon>
                <DesktopIcon icon={playingCards} name='纸牌' route='/playingCards'></DesktopIcon>
                <DesktopIcon icon={tankBattle} name='坦克大战' route='/tankBattle'></DesktopIcon>
                <DesktopIcon icon={rottenPenHead} name='练习' route='/rottenPenHead'></DesktopIcon>
                <DesktopIcon icon={threejs} name='ThreeJS' route='/threejs'></DesktopIcon>
                <DesktopIcon icon={chatRoom} name='简易聊天室' route='/chatRoom'></DesktopIcon>
            </div>
            <FloatMenu />
        </div>
    )
}