import { useEffect, useState } from 'react';
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
    isDefault: boolean
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
                isDefault: true
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
                if (selectedNumbers.indexOf(items.id) > 0) {
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

    const [sudoData, setSudoData] = useState<Sudo[][]>(generateData(params.modal ?? 'easy'))
    const [selectedItem, setSelectedItem] = useState<Sudo | null>(null)
    const [sudoKey, setSudoKey] = useState<boolean>(false)

    // 点击选中格子，通过数字按键修改数据
    const clickChange = (items: Sudo) => {
        if (!items.isDefault) {
            setSelectedItem(items)
        } else {
            setSelectedItem(null)
        }
    }

    const handleKeyDown = (event: { keyCode: number; key: string }) => {
        if (selectedItem != null) {
            if (event.keyCode === 49 || event.keyCode === 50 || event.keyCode === 51 || event.keyCode === 52 || event.keyCode === 53 || event.keyCode === 54 || event.keyCode === 55 || event.keyCode === 56 || event.keyCode === 57) {
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
                setSudoData(copySudoData)
            }
            if (event.keyCode == 8 || event.keyCode === 48) {
                let item = selectedItem
                item.value = 0
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

    return (
        <div className='main' onKeyDown={handleKeyDown}>
            <div className='content' key={sudoKey ? 'aa' : 'bb'}>
                {sudoData.map((item, i) => {
                    return (
                        <div className='bigCell' key={`cell${i}`}>
                            {item.map(items => {
                                return (
                                    <Button className='numberCell' key={`${items.id} / ${items.value}`} onClick={() => clickChange(items)} style={{ fontWeight: items.isDefault ? 800 : 400 }} disabled={items.isDefault ? true : false}>{items.value == 0 ? '' : items.value}</Button>
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