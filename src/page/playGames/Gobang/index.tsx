import { useEffect, useRef, useState } from 'react';
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
    const [gameState, setGameState] = useState<string>('NotStart') // 游戏状态（异步，存在延迟）  NotStart/未开始 Start/开始 Suspend/暂停 Over/结束 Win/胜利
    const gameStateRef = useRef('NotStart') //  同步游戏状态
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

    const [isClick, setIsClick] = useState<boolean>(true)  //  用户是否可以点击
    useEffect(() => {
        if (isClick == false) {
            setTimeout(() => {
                setIsClick(!isClick)
            }, 1000);
        }
    }, [isClick])

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
        setIsClick(false)
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
        if (!copyData[pointX][pointY].color && (gameStateRef.current == 'Start' || gameStateRef.current == 'NotStart')) {
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
        gameStateRef.current = 'NotStart'
    }

    // 切换开始方
    const changeStartColor = (color: string) => {
        if (gameStateRef.current == 'NotStart' && (rotationColor ? 'black' : 'white') != color) {
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
            gameStateRef.current = 'Start'
        }
        if (blackPieces.length >= 5) {
            if (isWin(blackPieces)) {
                setVictory(' 黑子 ')
            }
        }
        if (whitePieces.length >= 5) {
            if (isWin(whitePieces)) {
                setVictory(' 白子 ')
            }
        }
    }, [blackPieces, whitePieces])

    // 判断是否存在胜利方
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

        if (gameResult) {
            gameStateRef.current = 'Win'
        }
        return gameResult
    }

    useEffect(() => {
        setGameState(gameStateRef.current)
        // console.log(gameState)
        if (gameStateRef.current == 'Win') {
            // console.log(blackPieces)
            // console.log(whitePieces)
            messageApi.open({
                type: 'success',
                content: victory + '胜利！！！',
            })
            setShowOverlay(true)
        }
    }, [gameStateRef.current])

    useEffect(() => {
        if (!rotationColor && gameStateRef.current == 'Start') {
            setTimeout(() => {
                computerChess()
            }, 600)
        }
    }, [rotationColor])

    // 电脑落子
    const computerChess = () => {
        // 电脑落子 利用算法————权重值
        // 初始棋盘全空值（未落子）的权重值为1，已落子的权重值为0，说明：权值只针对电脑使用，不计该点对玩家的权值
        // 落子计算权值，以下是该空点若落子为哪方之后，计算权重值
        // 连一，玩家+5，电脑+5
        // 连二，玩家+10，电脑+10
        // 死三，玩家+30，电脑+25
        // 活三，玩家+40，电脑+50
        // 死四，玩家+60，电脑+55
        // 活四，玩家+200，电脑+300
        // 连五，玩家+20000，电脑+30000

        // 判断哪一点的值最高，也就是对电脑的利益最大
        // 每下一步，就会判断某点对于玩家利益大还是自身利益大，来进行围堵和进攻
        const computerScore: any = [];	// 空点
        let maxScore = 0;			// 最大值
        let position: any = [] // 可以落子的位置

        // 初始化玩家和电脑每个点的数值
        for (let i = 0; i < 15; i++) {
            computerScore[i] = [];
            for (let j = 0; j < 15; j++) {
                computerScore[i][j] = 0;
            }
        }
        pieces.forEach((item, i) => {
            item.forEach((items, j) => {
                if (items.color != null) {
                    computerScore[i][j] = 0
                } else {
                    computerScore[i][j] = weightValue("white", pieces, i, j)
                }
            })
        })
        // console.log(computerScore)
        // console.log(pieces)

        maxScore = Math.max(...computerScore.flat(Infinity));  //  获取最大值

        computerScore.forEach((item: number[], i: number) => {
            item.forEach((items: number, j: number) => {
                if (items == maxScore) {
                    position.push([i, j])
                }
            })
        })

        if (position.length == 1) {
            chessPieceDrop(position[0][0], position[0][1])
        } else if (position.length > 0) {
            let num = Rand(0, position.length - 1)
            chessPieceDrop(position[num][0], position[num][1])
        }

    }
    // 权重值
    const weightValue = (color: string, data: any, x: number, y: number) => {
        let max: number = 1
        const contraryColor = color == 'black' ? 'white' : 'black'

        let directs = [[1, 0], [1, 1], [0, 1], [-1,]];
        for (let k = 0; k < 4; k++) {
            let row = directs[k][0];
            let col = directs[k][1];

            //重置
            let personNum = 0;  //  电脑连子数
            let emptyNum = 0;   //  玩家围攻棋子数量
            let botNum = 0; //  玩家连子数
            let emptyNumT = 0; //  电脑围攻棋子数量

            //! 该点对电脑权值
            // 正向
            for (let i = 1; i <= 4; i++) {
                if (x + i * col >= 0 && x + i * col < 15 &&
                    y + i * row >= 0 && y + i * row < 15 &&
                    pieces[x + i * col]?.[y + i * row]?.color == color) {
                    //玩家的子
                    personNum++;
                } else if (x + i * col >= 0 && x + i * col < 15 &&
                    y + i * row >= 0 && y + i * row < 15 && pieces[x + i * col]?.[y + i * row]?.color == null) {
                    //空白位
                    emptyNum++;
                    break;    //遇到空白位置停止该方向搜索
                } else {
                    break;    //出边界或遇到玩家棋子停止搜索
                }
            }
            // 反向
            for (let i = 1; i <= 4; i++) {
                if (x - i * col >= 0 && x - i * col < 15 &&
                    y - i * row >= 0 && y - i * row < 15 &&
                    pieces[x - i * col]?.[y - i * row]?.color == color) {
                    personNum++;
                } else if (x - i * col >= 0 && x - i * col < 15 &&
                    y - i * row >= 0 && y - i * row < 15 &&
                    pieces[x - i * col]?.[y - i * row]?.color == null) {
                    emptyNum++;
                    break;
                } else {
                    break;
                }
            }

            if (personNum == 1) {
                max += 10;
            } else if (personNum == 2) {
                if (emptyNum == 1) {
                    //死3
                    max += 30;
                } else if (emptyNum == 2) {
                    //活3
                    max += 40;
                }
            } else if (personNum == 3) {
                if (emptyNum == 1) {
                    //死4
                    max += 60;
                } else if (emptyNum == 2) {
                    //活4
                    max += 200;
                }
            } else if (personNum == 4) {
                max += 20000;
            }

            //! 该点对玩家权值
            // 正向
            for (let i = 1; i <= 4; i++) {
                if (x + i * col >= 0 && x + i * col < 15 &&
                    y + i * row >= 0 && y + i * row < 15 &&
                    pieces[x + i * col]?.[y + i * row]?.color == contraryColor) {
                    //玩家的子
                    botNum++;
                } else if (x + i * col >= 0 && x + i * col < 15 &&
                    y + i * row >= 0 && y + i * row < 15 && pieces[x + i * col]?.[y + i * row]?.color == null) {
                    //空白位
                    emptyNumT++;
                    break;    //遇到空白位置停止该方向搜索
                } else {
                    break;    //出边界或遇到电脑棋子停止搜索
                }
            }
            // 反向
            for (let i = 1; i <= 4; i++) {
                if (x - i * col >= 0 && x - i * col < 15 &&
                    y - i * row >= 0 && y - i * row < 15 &&
                    pieces[x - i * col]?.[y - i * row]?.color == contraryColor) {
                    botNum++;
                } else if (x - i * col >= 0 && x - i * col < 15 &&
                    y - i * row >= 0 && y - i * row < 15 &&
                    pieces[x - i * col]?.[y - i * row]?.color == null) {
                    emptyNumT++;
                    break;
                } else {
                    break;
                }
            }

            if (botNum == 0) {
                //连1
                max += 5;
            } else if (botNum == 1) {
                //活2
                max += 10;
            } else if (botNum == 2) {
                if (emptyNumT == 1) {
                    //死3
                    max += 25;
                } else if (emptyNumT == 2) {
                    //活3
                    max += 50;
                }
            } else if (botNum == 3) {
                if (emptyNumT == 1) {
                    //死4
                    max += 55;
                } else if (emptyNumT == 2) {
                    //活4
                    max += 300;
                }
            } else if (botNum >= 4) {
                //活5
                max += 30000;
            }
        }

        return max
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
            <canvas className='contentGobang' id='gobang' onClick={isClick ? (event) => handleBoardClick(event) : () => { }} />
        </div>
    );
}

export default Gobang;
