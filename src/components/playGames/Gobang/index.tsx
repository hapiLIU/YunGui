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
        // 绘制定位五点
        const fivePoint = [
            { x: 3, y: 3 },
            { x: 11, y: 3 },
            { x: 3, y: 11 },
            { x: 11, y: 11 },
            { x: 7, y: 7 },
        ]
        fivePoint.forEach(item => {
            ctx.beginPath();
            ctx.arc(
                cellSize / 2 + item.x * cellSize,
                cellSize / 2 + item.y * cellSize,
                (cellSize / 2 - 4) / 2,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = "#000";
            ctx.fill();
        })

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

        chessPieceDrop(row, col)
    };
    // 落子
    const chessPieceDrop = (pointX: number, pointY: number, player?: string,) => {
        let copyData = [...pieces]
        if (!copyData[pointX][pointY].color && (gameState == 'Start' || gameState == 'NotStart')) {
            copyData[pointX][pointY].color = rotationColor ? 'black' : 'white'
            setPieces(copyData)
            if (rotationColor) {
                setBlackPieces(pre => [...pre, { col: pointY, row: pointX, color: 'black' }])
            } else {
                setWhitePieces(pre => [...pre, { col: pointY, row: pointX, color: 'white' }])
            }
            setRotationColor(pre => !pre)
        }
    }

    // 重新对局
    const again = () => {
        setBlackPieces([])
        setWhitePieces([])
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
            if (pieces[item.row]?.[item.col + 1]?.color == item.color && pieces[item.row]?.[item.col + 2]?.color == item.color && pieces[item.row]?.[item.col + 3]?.color == item.color && pieces[item.row]?.[item.col + 4]?.color == item.color) {
                gameResult = true
            }
            // 左
            if (pieces[item.row]?.[item.col - 1]?.color == item.color && pieces[item.row]?.[item.col - 2]?.color == item.color && pieces[item.row]?.[item.col - 3]?.color == item.color && pieces[item.row]?.[item.col - 4]?.color == item.color) {
                gameResult = true
            }
            // 上
            if (pieces[item.row - 1]?.[item.col]?.color == item.color && pieces[item.row - 2]?.[item.col]?.color == item.color && pieces[item.row - 3]?.[item.col]?.color == item.color && pieces[item.row - 4]?.[item.col]?.color == item.color) {
                gameResult = true
            }
            // 下
            if (pieces[item.row + 1]?.[item.col]?.color == item.color && pieces[item.row + 2]?.[item.col]?.color == item.color && pieces[item.row + 3]?.[item.col]?.color == item.color && pieces[item.row + 4]?.[item.col]?.color == item.color) {
                gameResult = true
            }
            // 右上
            if (pieces[item.row - 1]?.[item.col + 1]?.color == item.color && pieces[item.row - 2]?.[item.col + 2]?.color == item.color && pieces[item.row - 3]?.[item.col + 3]?.color == item.color && pieces[item.row - 4]?.[item.col + 4]?.color == item.color) {
                gameResult = true
            }
            // 右下
            if (pieces[item.row + 1]?.[item.col + 1]?.color == item.color && pieces[item.row + 2]?.[item.col + 2]?.color == item.color && pieces[item.row + 3]?.[item.col + 3]?.color == item.color && pieces[item.row + 4]?.[item.col + 4]?.color == item.color) {
                gameResult = true
            }
            // 左上
            if (pieces[item.row - 1]?.[item.col - 1]?.color == item.color && pieces[item.row - 2]?.[item.col - 2]?.color == item.color && pieces[item.row - 3]?.[item.col - 3]?.color == item.color && pieces[item.row - 4]?.[item.col - 4]?.color == item.color) {
                gameResult = true
            }
            // 左下
            if (pieces[item.row + 1]?.[item.col - 1]?.color == item.color && pieces[item.row + 2]?.[item.col - 2]?.color == item.color && pieces[item.row + 3]?.[item.col - 3]?.color == item.color && pieces[item.row + 4]?.[item.col - 4]?.color == item.color) {
                gameResult = true
            }
        })

        return gameResult
    }
    useEffect(() => {
        // console.log(gameState)
        if (gameState == 'Win') {
            // console.log(blackPieces)
            // console.log(whitePieces)
            messageApi.open({
                type: 'success',
                content: victory + '胜利！！！',
            })
            setShowOverlay(true)
        }
    }, [gameState])

    // 电脑落子
    const computerChess = () => {
        // 电脑落子 利用算法————权重值
        // 判断哪一点的值最高，也就是对电脑的利益最大
        // 每下一步，就会判断某点对于玩家利益大还是自身利益大，来进行围堵和进攻
        const playerScore: any = [];  	// 对于玩家而言，每一个空点的数值集合
        const computerScore: any = [];	// 对于电脑而言，每一个空点的数值集合
        let maxScore = 0;			// 最大值
        let x = 0, y = 0;			// 最后决定电脑落子的位置

        // 初始化玩家和电脑每个点的数值
        for (let i = 0; i < 15; i++) {
            playerScore[i] = [];
            computerScore[i] = [];
            for (let j = 0; j < 15; j++) {
                playerScore[i][j] = 0;
                computerScore[i][j] = 0;
            }
        }
        console.log(pieces)

    }
    // 随机数
    const Rand = (Min: number, Max: number) => {
        switch (Min) {
            case 0: return Math.round(Math.random() * Max);
            case 1: return Math.ceil(Math.random() * Max);
            default: return Math.round(Math.random() * (Max - Min) + Min);
        }
    }

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
                <Button type="primary" onClick={computerChess}>测试按钮</Button>
            </div>
            <canvas className='contentGobang' id='gobang' onClick={(event) => handleBoardClick(event)} />
        </div>
    );
}

export default Gobang;
