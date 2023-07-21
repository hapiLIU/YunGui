import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

interface Sudo {
    cell: number;   // 所在格子下标
    index: number;   // 所在格子内数字下标
    row: number;   // 行
    col: number;   // 列
    value: number;   // 值
    id: number;   // 专属ID
    isDefault: boolean;   // 是否默认
    isSameExists: boolean;   // 是否存在相同
}

const generateData = (modal: string) => {
    const board: Sudo[][] = [];
    let num = 1
    for (let i = 0; i < 9; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            board[i][j] = {
                cell: i,
                index: j,
                row: ((Math.floor(i / 3) * 3) + (Math.floor(j / 3) + 1)),
                col: (((i % 3) * 3) + ((j % 3) + 1)),
                value: 0,
                id: num,
                isDefault: true,
                isSameExists: false
            };
            num++
        }
    }
    // 递归函数，用于填充每个小九宫格
    function fillSubgrid(x: number, y: number) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // 打乱 nums 数组，使之随机排序
        for (let i = nums.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        // 遍历当前小九宫格的每个位置，填充数字
        for (let i = x; i < x + 3; i++) {
            for (let j = y; j < y + 3; j++) {
                // 如果当前位置还没有填充数字
                if (board[i][j] && board[i][j].value && board[i][j].value === 0) {
                    // 从 nums 数组中取出一个数字填充当前位置
                    for (let k = 0; k < nums.length; k++) {
                        const num = nums[k];
                        const canFill = isValid(board, board[i][j], num);
                        if (canFill) {
                            board[i][j].value = num;
                            // 如果当前小九宫格已填满数字，则递归到下一个小九宫格
                            if (i === x + 2 && j === y + 2) {
                                if (!fillSubgrid(x, y + 3)) {
                                    board[i][j].value = 0;
                                    continue;
                                }
                            } else {
                                // 否则递归到当前小九宫格的下一个位置
                                if (!fillSubgrid(i, j)) {
                                    board[i][j].value = 0;
                                    continue;
                                }
                            }
                            return true;
                        }
                    }
                    // 如果当前位置不能填任何数字，则返回 false
                    return false;
                }
            }
        }
        // 如果当前小九宫格已填满数字，返回 true
        return true;
    }

    // 递归函数，用于填充整个大的九宫格
    function fillSudoku(x: number, y: number): boolean {
        // 如果当前行已填满数字，则递归到下一行
        if (y === 9) {
            return fillSudoku(x + 1, 0);
        }
        // 如果整个大九宫格已填满数字，则返回 true
        if (x === 9) {
            return true;
        }
        // 如果当前位置已经填过数字，则递归到下一个位置
        if (board[x][y].value !== 0) {
            return fillSudoku(x, y + 1);
        }
        // 打乱 1-9 的数字，使之随机排序
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = nums.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        // 遍历当前位置可填的数字，依次填充数字并递归到下一个位置
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            const canFill = isValid(board, board[x][y], num);
            if (canFill) {
                board[x][y].value = num;
                if (fillSudoku(x, y + 1)) {
                    return true;
                }
                board[x][y].value = 0;
            }
        }
        // 如果当前位置不能填任何数字，则返回 false
        return false;
    }

    // 根据游戏难度随即将数据填空
    function fillBlank(board: Sudo[][], modal: string) {
        const result = [...board]
        let surplusNum = modal == 'easy' ? 30 : (modal == 'medium' ? 45 : 60)

        const allNumbers = Array.from({ length: 81 }, (_, i) => i + 1);
        const shuffledNumbers = allNumbers.sort(() => Math.random() - 0.5);
        const selectedNumbers = shuffledNumbers.slice(0, surplusNum)

        result.map(item => {
            item.map(items => {
                if (selectedNumbers.indexOf(items.id) >= 0) {
                    items.isDefault = false
                    items.value = 0
                }
            })
        })
        return result
    }

    // 填充第一个小九宫格，并从第二个小九宫格开始填充整个大的九宫格
    fillSubgrid(0, 0);
    fillSudoku(0, 0);
    fillBlank(board, modal)

    return board;
};
// 判断当前位置是否可以填充指定数字
const isValid = (board: Sudo[][], items: Sudo, num: number): boolean => {
    if (num == 0) {
        return true
    }
    // 检查当前行是否已经有相同的数字
    if (filterSame(board, 'row', items.row, items.id).indexOf(num) >= 0) {
        return false
    }
    // 检查当前列是否已经有相同的数字
    if (filterSame(board, 'col', items.col, items.id).indexOf(num) >= 0) {
        return false
    }
    // 检查当前宫格是否已经有相同的数字
    if (filterSame(board, 'cell', items.cell, items.id).indexOf(num) >= 0) {
        return false
    }
    return true; // 当前数字符合规则
}
// 根据条件筛选相同项
const filterSame = (board: Sudo[][], filed: string, filedData: number, eliminateID: number) => {
    let result: number[] = []
    board.forEach(item => {
        item.forEach((items: any) => {
            if (items[filed] == filedData && items.id != eliminateID) {
                result.push(items.value)
            }
        })
    })
    return result
}

const SudokuGame = () => {
    let params = useParams();
    const navigate = useNavigate()

    const [sudoData, setSudoData] = useState<Sudo[][]>(generateData(params.modal ?? 'easy'))
    const [selectedItem, setSelectedItem] = useState<Sudo | null>(null)
    const [sudoKey, setSudoKey] = useState<boolean>(false)
    const [remainingTimes, setRemainingTimes] = useState<number>(params.modal == 'easy' ? 30 : (params.modal == 'medium' ? 45 : 60))
    const [gameState, setGameState] = useState<string>('NotStart') // 游戏状态  NotStart/未开始 Start/开始 Suspend/暂停 Over/结束 Win/胜利
    const [showOverlay, setShowOverlay] = useState(false);  // 全局蒙版
    const gameStateWord: any = {
        NotStart: "游戏未开始",
        Start: "游戏开始",
        Suspend: "游戏暂停！",
        Over: "游戏结束！",
        Win: "胜利！！！",
    }

    // 点击选中格子，通过数字按键修改数据
    const clickChange = (items: Sudo) => {
        if (!items.isDefault) {
            setSelectedItem(items)
        } else {
            setSelectedItem(null)
        }
    }

    // 数字按键按下，将数字填写入所点击的格子
    const handleKeyDown = (event: { keyCode: number; key: string }) => {
        if (selectedItem != null) {
            if (gameState == 'NotStart') {
                setGameState('Start')
            }
            if (event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51 || event.keyCode === 52 || event.keyCode === 53 || event.keyCode === 54 || event.keyCode === 55 || event.keyCode === 56 || event.keyCode === 57) {
                if (selectedItem.value == 0) {
                    setRemainingTimes(pre => pre - 1)
                }
                let item = selectedItem
                item.value = Number(event.key)
                setSelectedItem(item)

                const copySudoData = [...sudoData]
                copySudoData.map(item => {
                    item.map(items => {
                        if (items.id == selectedItem?.id) {
                            return selectedItem
                        }
                    })
                })
                copySudoData.map(item => {
                    item.map(items => {
                        if (items.value != 0 && !items.isDefault) {
                            if (!isValid(sudoData, items, items.value)) {
                                items.isSameExists = true
                            } else {
                                items.isSameExists = false
                            }
                        } else {
                            items.isSameExists = false
                        }
                    })
                })
                setSudoData(copySudoData)
            }
            if (event.keyCode == 8 || event.keyCode === 48) {
                if (selectedItem.value != 0) {
                    setRemainingTimes(pre => pre + 1)
                }
                let item = selectedItem
                item.value = 0
                item.isSameExists = false
                setSelectedItem(item)

                const copySudoData = [...sudoData]
                copySudoData.map(item => {
                    item.map(items => {
                        if (items.id == selectedItem?.id) {
                            return selectedItem
                        }
                    })
                })
                setSudoData(copySudoData)
            }
        }
    }

    // 计时器操作
    const [time, setTime] = useState<number>(0);
    const timerRef = useRef<any>(null);

    useEffect(() => {
        if (gameState == 'Start') {
            setShowOverlay(false)
            timerRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
            return () => clearInterval(timerRef.current);
        } else if (gameState == 'Suspend' || gameState == 'Over' || gameState == 'Win') {
            clearInterval(timerRef.current);
            setShowOverlay(true)
        }
    }, [gameState]);

    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    //   重新对局
    const again = () => {
        setSudoData(generateData(params.modal ?? 'easy'))
        setSelectedItem(null)
        setRemainingTimes(params.modal == 'easy' ? 30 : (params.modal == 'medium' ? 45 : 60))
        setTime(0)
        setGameState('NotStart')
        setShowOverlay(false)
        setSudoKey(prev => !prev)
    }

    useEffect(() => {
        if (remainingTimes == 0) {
            let isWin = true
            sudoData.forEach(item => {
                item.forEach(items => {
                    if (items.isSameExists) {
                        isWin = false
                    }
                })
            })
            if (isWin) {
                setGameState('Win')
                setShowOverlay(true)
            }
        }
    }, [remainingTimes, sudoData])

    return (
        <div className='mainSudoku' onKeyDown={handleKeyDown}>
            <div className='titleSudoku' style={{ width: 924 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button type="primary" onClick={() => navigate('/sudoku')}>更换模式</Button>
                    <h3> Time: {formattedMinutes}:{formattedSeconds} </h3>
                    <Button type="primary" onClick={again}>重新对局</Button>
                </div>
            </div>
            <div className='contentSudoku' key={sudoKey ? 'aa' : 'bb'} style={{ position: "relative" }}>
                {showOverlay && <div className="overlay" >{gameStateWord[gameState]}</div>}
                {sudoData.map((item, i) => {
                    return (
                        <div className='bigCell' key={`cell${i}`}>
                            {item.map(items => {
                                return (
                                    <Button className='numberCell' key={`${items.id} / ${items.value}`} onClick={() => clickChange(items)} style={{ fontWeight: items.isDefault ? 800 : 400, borderColor: items.isSameExists ? "red" : '' }} disabled={items.isDefault ? true : false}>{items.value == 0 ? '' : items.value}</Button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SudokuGame;