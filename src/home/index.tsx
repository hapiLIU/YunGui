import './index.scss'
import FloatMenu from '../components/FloatMenu'
import Watch from '../components/Watch'

import minesweeper from '../image/扫雷.jpg'
import sudoku from '../image/数独.jpg'
import gobang from '../image/五子棋.jpg'
import playingCards from '../image/纸牌.jpg'
import tankBattle from '../image/坦克.jpg'
import rottenPenHead from '../image/练习.jpg'
import threejs from '../image/threejs.jpg'
import chatRoom from '../image/聊天.jpg'
import FallingFlowers from '../components/FallingFlowers'
import AppModal from '../components/AppModal/appModal'

// 实用工具
import toolWeb from './website/tool.json'
// 学习天地
import learnWeb from './website/learn.json'
// 奇趣网站
import interestingWeb from './website/Interesting.json'
// 娱乐游戏
import gameWeb from './website/game.json'

export default function Home() {

    // 模仿相关游戏自己手写的小游戏
    const selfDevGame = [
        {
            icon: minesweeper,
            name: '扫雷',
            route: "/minesweeper",
            ribbon: { text: '测试阶段', color: 'green' }
        }, {
            icon: sudoku,
            name: '数独',
            route: "/sudoku",
            ribbon: { text: '测试阶段', color: 'green' }
        },
        {
            icon: gobang,
            name: '五子棋',
            route: "/gobang",
            ribbon: { text: '测试阶段', color: 'green' }
        },
        {
            icon: playingCards,
            name: '纸牌',
            route: "/playingCards",
            ribbon: { text: '开发搁置', color: 'red' }
        },
        {
            icon: tankBattle,
            name: '坦克大战',
            route: "/tankBattle",
            ribbon: { text: '开发搁置', color: 'red' }
        },
    ]
    // 个人练习
    const practice = [
        {
            icon: rottenPenHead,
            name: '练习',
            route: "/rottenPenHead",
            ribbon: { text: '个人练习', color: 'cyan' }
        }, {
            icon: threejs,
            name: 'ThreeJS',
            route: "/threejs",
            ribbon: { text: '个人练习', color: 'cyan' }
        },
        {
            icon: chatRoom,
            name: '简易聊天室',
            route: "/chatRoom",
            ribbon: { text: '开发搁置', color: 'red' }
        },
    ]

    return (
        <div className='menu'>
            <FallingFlowers />
            <div className='time'>
                <Watch />
            </div>
            <div className='content'>
                <AppModal title={'实用工具'} desktopApp={toolWeb} />
                <AppModal title={'学习天地'} desktopApp={learnWeb} />
                <AppModal title={'奇趣网站'} desktopApp={interestingWeb} />
                <AppModal title={'娱乐游戏'} desktopApp={gameWeb} />
                <AppModal title={'拙作'} desktopApp={selfDevGame} />
                <AppModal title={'练习实践'} desktopApp={practice} />
            </div>
            <FloatMenu />
        </div>
    )
}