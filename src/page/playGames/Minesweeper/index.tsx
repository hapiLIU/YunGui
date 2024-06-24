import { useState } from 'react';
import './index.scss';
import { Button, InputNumber, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Minesweeper = () => {
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false);
  const [customRow, setCustomRow] = useState(10);
  const [customCol, setCustomCol] = useState(10);
  const [customMines, setCustomMines] = useState(25);

  return (
    <div className='main'>
      <h1>扫雷</h1>
      <Button type="primary" onClick={() => setModalOpen(true)} style={{ width: 200, height: 50, margin: 20 }}>
        开始游戏
      </Button>
      <Button type="primary" onClick={() => navigate(process.env.NODE_ENV == 'development' ? '/' : '/YunGui/')} style={{ width: 200, height: 50, margin: 20 }}>
        返回首页
      </Button>
      <Modal
        title="请选择游戏模式"
        wrapClassName={'modal'}
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={1000}
      >
        <div className='modalMain'>
          <Button className='btn' onClick={() => navigate('/minesweeper/game/10/10/25')}>
            <h3>简单</h3>
            <p>10 × 10</p>
          </Button>
          <Button className='btn' onClick={() => navigate('/minesweeper/game/20/20/150')}>
            <h3>中等</h3>
            <p>20 × 20</p>
          </Button>
          <Button className='btn' onClick={() => navigate('/minesweeper/game/30/30/400')}>
            <h3>困难</h3>
            <p>30 × 30</p>
          </Button>
          <Button className='btn' onClick={() => navigate(`/minesweeper/game/${customRow}/${customCol}/${customMines}`)}>
            <h3>自定义</h3>
            <p>由你自己定义</p>
          </Button>
        </div>
        <div style={{ width: 500, margin: "0 auto" }}>
          <h3>自定义游戏</h3>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <div>行：<InputNumber min={1} defaultValue={10} onChange={(value) => setCustomRow(value ?? 10)} /></div>
            <div> 列：<InputNumber min={1} defaultValue={10} onChange={(value) => setCustomCol(value ?? 10)} /></div>
            <div>💣：<InputNumber min={1} defaultValue={25} max={customRow * customCol} onChange={(value) => setCustomMines(value ?? 25)} /></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Minesweeper;
