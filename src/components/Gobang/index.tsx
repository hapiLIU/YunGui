import { useEffect, useState } from 'react';
import './index.scss';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AlertFilled, AlertOutlined } from '@ant-design/icons';

interface Gobang {
    row: number,
    col: number,
    color: 'black' | 'white' | null
}

const Gobang = () => {
    const navigate = useNavigate()

    const generateData = () => {
        const board: Gobang[][] = [];
        for (let i = 0; i < 15; i++) {
            board[i] = [];
            for (let j = 0; j < 15; j++) {
                board[i][j] = {
                    row: i,
                    col: j,
                    color: null
                };
            }
        }
        return board
    }

    const [pieces, setPieces] = useState<Gobang[][]>(generateData())    //  棋子数据
    const [rotationColor, setRotationColor] = useState<boolean>(true) //  轮换棋子颜色 true:'black' | false: 'white'
    const [gameState, setGameState] = useState<string>('NotStart') // 游戏状态  NotStart/未开始 Start/开始 Suspend/暂停 Over/结束 Win/胜利
    const [showOverlay, setShowOverlay] = useState(false);  // 全局蒙版
    const gameStateWord: any = {
        NotStart: "游戏未开始",
        Start: "游戏开始",
        Suspend: "游戏暂停！",
        Over: "游戏结束！",
        Win: "胜利！！！",
    }
    const [messageApi, contextHolder] = message.useMessage();   // 全局提示
    const [blackPieces, setBlackPieces] = useState<Gobang[]>([])    // 黑子
    const [whitePieces, setWhitePieces] = useState<Gobang[]>([])    // 白子
    const [victory, setVictory] = useState<string | null>(null)

    useEffect(() => {
        const canvas = document.getElementById('gobang') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const cellSize = 50; // 格子大小
        const gridSize = cellSize * 15; // 棋盘大小

        canvas.width = cellSize * 15;
        canvas.height = cellSize * 15;

        // 绘制棋盘
        ctx.beginPath();
        for (let i = 0; i < 15; i++) {
            ctx.moveTo(cellSize / 2 + i * cellSize, cellSize / 2);
            ctx.lineTo(cellSize / 2 + i * cellSize, gridSize - cellSize / 2);
            ctx.moveTo(cellSize / 2, cellSize / 2 + i * cellSize);
            ctx.lineTo(gridSize - cellSize / 2, cellSize / 2 + i * cellSize);
        }
        ctx.stroke();

        // 绘制棋子
        const drawPiece = (x: number, y: number, color: string) => {
            ctx.beginPath();
            ctx.arc(
                cellSize / 2 + x * cellSize,
                cellSize / 2 + y * cellSize,
                cellSize / 2 - 4,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = color;
            ctx.fill();
        };

        // 示例：绘制一个黑色棋子
        // drawPiece(7, 7, 'black');
        pieces.forEach(item => {
            item.forEach(items => {
                if (items.color) {
                    drawPiece(items.col, items.row, items.color);
                }
            })
        })
    }, [pieces]);

    // 根据落子位置处理数据绘制棋子
    const handleBoardClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = event.currentTarget;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const cellSize = 50; // 格子大小
        const row = Math.floor(y / cellSize);
        const col = Math.floor(x / cellSize);

        let copyData = [...pieces]
        if (!copyData[row][col].color && (gameState == 'Start' || gameState == 'NotStart')) {
            copyData[row][col].color = rotationColor ? 'black' : 'white'
            setPieces(copyData)
            if (rotationColor) {
                setBlackPieces(pre => [...pre, { col: col, row: row, color: 'black' }])
            } else {
                setWhitePieces(pre => [...pre, { col: col, row: row, color: 'white' }])
            }
            setRotationColor(pre => !pre)
        }
    };

    // 重新对局
    const again = () => {
        setPieces(generateData())
        setRotationColor(true)
        setGameState('NotStart')
    }

    // 切换开始方
    const changeStartColor = (color: string) => {
        if (gameState == 'NotStart' && (rotationColor ? 'black' : 'white') != color) {
            setRotationColor(pre => !pre)
        } else {
            // 做个全局提示
            messageApi.open({
                type: 'warning',
                content: '对局进行中，无法再更换落子方...',
            })
        }
    }

    useEffect(() => {
        // console.log('black', blackPieces)
        // console.log('white', whitePieces)
        if (blackPieces.length + whitePieces.length > 0) {
            setGameState('Start')
        }
        if (blackPieces.length >= 5) {
            if (isWin(blackPieces)) {
                setGameState("Win")
                setVictory(' 黑子 ')
            }
        }
        if (whitePieces.length >= 5) {
            if (isWin(whitePieces)) {
                setGameState("Win")
                setVictory(' 白子 ')
            }
        }
    }, [blackPieces, whitePieces])

    const isWin = (data: Gobang[]) => {
        let gameResult: boolean = false

        data.forEach(item => {
            // 右
            if (pieces[item.row][item.col + 1]?.color == item.color && pieces[item.row][item.col + 2]?.color == item.color && pieces[item.row][item.col + 3]?.color == item.color && pieces[item.row][item.col + 4]?.color == item.color) {
                gameResult = true
            }
            // 左
            if (pieces[item.row][item.col - 1]?.color == item.color && pieces[item.row][item.col - 2]?.color == item.color && pieces[item.row][item.col - 3]?.color == item.color && pieces[item.row][item.col - 4]?.color == item.color) {
                gameResult = true
            }
            // 上
            if (pieces[item.row - 1][item.col]?.color == item.color && pieces[item.row - 2][item.col]?.color == item.color && pieces[item.row - 3][item.col]?.color == item.color && pieces[item.row - 4][item.col]?.color == item.color) {
                gameResult = true
            }
            // 下
            if (pieces[item.row + 1][item.col]?.color == item.color && pieces[item.row + 2][item.col]?.color == item.color && pieces[item.row + 3][item.col]?.color == item.color && pieces[item.row + 4][item.col]?.color == item.color) {
                gameResult = true
            }
            // 右上
            if (pieces[item.row - 1][item.col + 1]?.color == item.color && pieces[item.row - 2][item.col + 2]?.color == item.color && pieces[item.row - 3][item.col + 3]?.color == item.color && pieces[item.row - 4][item.col + 4]?.color == item.color) {
                gameResult = true
            }
            // 右下
            if (pieces[item.row + 1][item.col + 1]?.color == item.color && pieces[item.row + 2][item.col + 2]?.color == item.color && pieces[item.row + 3][item.col + 3]?.color == item.color && pieces[item.row + 4][item.col + 4]?.color == item.color) {
                gameResult = true
            }
            // 左上
            if (pieces[item.row - 1][item.col - 1]?.color == item.color && pieces[item.row - 2][item.col - 2]?.color == item.color && pieces[item.row - 3][item.col - 3]?.color == item.color && pieces[item.row - 4][item.col - 4]?.color == item.color) {
                gameResult = true
            }
            // 左下
            if (pieces[item.row + 1][item.col - 1]?.color == item.color && pieces[item.row + 2][item.col - 2]?.color == item.color && pieces[item.row + 3][item.col - 3]?.color == item.color && pieces[item.row + 4][item.col - 4]?.color == item.color) {
                gameResult = true
            }
        })

        return gameResult
    }
    useEffect(() => {
        // console.log(gameState)
        if (gameState == 'Win') {
            messageApi.open({
                type: 'success',
                content: victory + '胜利！！！',
            })
        }
    }, [gameState])

    return (
        <div className='mainGobang'>
            {contextHolder}
            <h1>五子棋</h1>
            <div className='headerGobang' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button type="primary" onClick={() => navigate('/')}>回首页</Button>
                <div style={{ fontSize: 18 }}>
                    <p><AlertFilled style={{ marginRight: 10, color: rotationColor ? "red" : '' }} onClick={() => changeStartColor('black')} />黑子</p>
                    <p><AlertOutlined style={{ marginRight: 10, color: !rotationColor ? "red" : '' }} onClick={() => changeStartColor('white')} />白子</p>
                </div>
                <Button type="primary" onClick={again}>重新对局</Button>
            </div>
            <canvas className='contentGobang' id='gobang' onClick={(event) => handleBoardClick(event)} />
        </div>
    );
}

export default Gobang;
