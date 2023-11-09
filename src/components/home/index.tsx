import { useNavigate } from 'react-router-dom'
import './index.scss'
import { Button } from 'antd'

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className='menu'>
            <Button className='menuBtn' title='扫雷' onClick={() => navigate('/minesweeper')}>💣</Button>
            <Button className='menuBtn' title='数独' onClick={() => navigate('/sudoku')}>9️⃣</Button>
            <Button className='menuBtn' title='五子棋' onClick={() => navigate('/gobang')}>⚄</Button>
            <Button className='menuBtn' title='纸牌' onClick={() => navigate('/playingCards')}>♠</Button>
        </div>
    )
}