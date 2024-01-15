import { useNavigate } from 'react-router-dom'
import './index.scss'
import { Button } from 'antd'
import FloatMenu from '../components/FloatMenu'
import DesktopIcon from '../components/DesktopIcon'

import minesweeper from '../image/扫雷.jpg'
import sudoku from '../image/数独.jpg'
import gobang from '../image/五子棋.jpg'
import playingCards from '../image/纸牌.jpg'
import tankBattle from '../image/坦克.jpg'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='menu'>
            {/* <Button className='menuBtn' title='扫雷' onClick={() => navigate('/minesweeper')}>💣</Button>
            <Button className='menuBtn' title='数独' onClick={() => navigate('/sudoku')}>9️⃣</Button>
            <Button className='menuBtn' title='五子棋' onClick={() => navigate('/gobang')}>⚄</Button>
            <Button className='menuBtn' title='纸牌' onClick={() => navigate('/playingCards')}>♠</Button>
            <Button className='menuBtn' title='坦克大战' onClick={() => navigate('/tankBattle')}>🎮</Button> */}
            <DesktopIcon icon={minesweeper} name='扫雷' route='/minesweeper'></DesktopIcon>
            <DesktopIcon icon={sudoku} name='数独' route='/sudoku'></DesktopIcon>
            <DesktopIcon icon={gobang} name='五子棋' route='/gobang'></DesktopIcon>
            <DesktopIcon icon={playingCards} name='纸牌' route='/playingCards'></DesktopIcon>
            <DesktopIcon icon={tankBattle} name='坦克大战' route='/tankBattle'></DesktopIcon>
            <FloatMenu />
        </div>
    )
}