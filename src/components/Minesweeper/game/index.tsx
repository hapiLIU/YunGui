import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const Minesweeper = () => {
  const navigate = useNavigate()
  let params = useParams();
  const rows = Number(params.rows) ?? 1
  const cols = Number(params.cols) ?? 1
  const mines = Number(params.mines) ?? 1

  const [clickNums, setClickNums] = useState<number>(0) // 点击次数
  const [gameState, setGameState] = useState<string>('NotStart') // 游戏状态  NotStart/未开始 Start/开始 Suspend/暂停 Over/结束 Win/胜利
  const gameStateWord: any = {
    NotStart: "游戏未开始",
    Start: "游戏开始",
    Suspend: "游戏暂停！",
    Over: "游戏结束！",
    Win: "胜利！！！",
  }
  // 标记计数
  const [markNums, setMarkNums] = useState<number>(mines)
  // 外层盒子的key及重置操作
  const [minKey, setMinKey] = useState(false)
  const again = () => {
    setBoard(initializeBoard(rows, cols, mines))
    setTime(0)
    setMarkNums(mines)
    setGameState('NotStart')
    setShowOverlay(false)
    setMinKey(prev => !prev)
  }

  // 定义游戏板
  const [board, setBoard] = useState<any[][]>(initializeBoard(rows, cols, mines));

  // 初始化游戏板
  function initializeBoard(rows: number, cols: number, mines: number): any[][] {
    const board: number[][] = [];
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i][j] = 0;
      }
    }
    // 随机放置地雷
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (board[row][col] === 0) {
        board[row][col] = -1;
        minesPlaced++;
      }
    }
    // 计算每个方块周围地雷数
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j] !== -1) {
          let count = 0;
          // 计算周围8格有多少个地雷
          for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, rows - 1); x++) {
            for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, cols - 1); y++) {
              if (board[x][y] === -1) {
                count++;
              }
            }
          }
          board[i][j] = count;
        }
      }
    }
    // 每个格子增加属性
    const result = [...board].map(item => {
      return item.map(items => {
        return { value: items, isRevealed: false, isMark: false }
      })
    })
    return result;
  }

  // 左键点击 翻开
  const clickBtn = (rowIndex: number, cell: any, colIndex: number) => {
    if (!cell.isMark) {
      let data = [...board]
      data[rowIndex][colIndex].isRevealed = true
      if (data[rowIndex][colIndex].value == 0) {
        data = handleEmptyCellClick(data, rowIndex, colIndex)
      }
      setBoard(data)
      if (data[rowIndex][colIndex].value == -1) {
        setGameState('Over')
      }
    }
    setClickNums(clickNums + 1)
    if (gameState == 'NotStart' && board[rowIndex][colIndex].value != -1) {
      setGameState('Start')
    }
  }
  // 空格子递归调用
  const handleEmptyCellClick = (data: any, rowIndex: number, colIndex: number): any[][] => {
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = colIndex - 1; j <= colIndex + 1; j++) {
        // 如果格子存在且未翻开
        if ((i >= 0 && i < rows) && (j >= 0 && j < cols) && !data[i][j].isRevealed) {
          data[i][j].isRevealed = true; // 标记为已翻开

          // 如果是空格子，递归调用 handleEmptyCellClick
          if (data[i][j].value == 0) {
            handleEmptyCellClick(data, i, j);
          }
        }
      }
    }
    return data
  }
  // 右键点击 标记/取消标记
  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number, cell: any, colIndex: number) => {
    event.preventDefault(); // 阻止默认右键菜单
    const data = [...board]
    if (!cell.isRevealed && !cell.isMark && markNums > 0) {
      data[rowIndex][colIndex].isMark = true
      setMarkNums(markNums - 1)
      setBoard(data)
    } else if (cell.isMark) {
      data[rowIndex][colIndex].isMark = false
      setMarkNums(markNums + 1)
      setBoard(data)
    }
    setClickNums(clickNums + 1)
    if (gameState == 'NotStart') {
      setGameState('Start')
    }
  };
  useEffect(() => {
    if (markNums == 0) {
      let rightMark = 0
      board.forEach(item => {
        item.forEach(items => {
          if (items.isMark && items.value == -1) {
            rightMark++
          }
        })
      })
      if (rightMark == mines) {
        setGameState('Win')
      }
    }
  }, [markNums])

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

  // 允许键盘ESC按键直接重开游戏
  const handleKeyDown = (event: { keyCode: number; }) => {
    if (event.keyCode === 27) {
      again()
    }
  }
  const [showOverlay, setShowOverlay] = useState(false);  // 全局蒙版

  // 双击左键
  const doubleClick = (rowIndex: number, cell: any, colIndex: number) => {
    if (cell.isRevealed && !cell.isMark && cell.value != 0) {
      let marked: number = 0
      let data = [...board]
      for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (let j = colIndex - 1; j <= colIndex + 1; j++) {
          // 如果格子存在且未翻开且已标记
          if ((i >= 0 && i < rows) && (j >= 0 && j < cols) && !data[i][j].isRevealed && data[i][j].isMark) {
            marked++
          }
        }
      }
      if (marked == cell.value) {
        for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
          for (let j = colIndex - 1; j <= colIndex + 1; j++) {
            // 如果格子存在且未翻开且已标记
            if ((i >= 0 && i < rows) && (j >= 0 && j < cols) && !data[i][j].isRevealed && !data[i][j].isMark) {
              clickBtn(i, data[i][j], j)
            }
          }
        }
      }
    }
  }

  // 暂停
  const suspend = () => {
    if (gameState == 'Start') {
      setGameState('Suspend')
    }
    if (gameState == 'Suspend') {
      setGameState('Start')
    }
  }

  return (
    <div onKeyDown={handleKeyDown} className='main'>
      <div className='title' style={{ width: (cols * 30) + 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={() => navigate('/minesweeper')}>更换模式</Button>
          <Button type="primary" onClick={suspend}>游戏暂停</Button>
          <Button type="primary" onClick={again}>重新对局</Button>
        </div>
        <h3 style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 + (cols / 5) }}><span>🚩：{markNums}</span><span> Time: {formattedMinutes}:{formattedSeconds} </span></h3>
      </div>
      <div className='content' style={{ width: (cols * 30) + 12, height: (rows * 30) + 12, position: 'relative' }}>
        {showOverlay && <div className="overlay" style={{ width: (cols * 30) + 12, height: (rows * 30) + 12, fontSize: 16 + (cols / 5) }} >{gameStateWord[gameState]}</div>}
        <div className="minesweeper" key={minKey ? 'aa' : 'bb'} >
          {board.map((row, rowIndex) =>
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) =>
                <button onClick={() => clickBtn(rowIndex, cell, colIndex)} onContextMenu={(event) => handleContextMenu(event, rowIndex, cell, colIndex)} onDoubleClick={() => doubleClick(rowIndex, cell, colIndex)} key={'row' + rowIndex + 'col' + colIndex} className={cell.isRevealed ? "btn2" : 'btn1'}>{cell.isRevealed ? (cell.value === -1 ? '💣' : cell.value === 0 ? '' : cell.value) : (cell.isMark ? "🚩" : '')}</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Minesweeper;
