import { useState } from 'react';
import './index.scss';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Sudoku = () => {
    const navigate = useNavigate()

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className='main'>
            <Button type="primary" onClick={() => setModalOpen(true)} style={{ width: 200, height: 50, margin: 20 }}>
                开始游戏
            </Button>
            <Button type="primary" onClick={() => navigate('/')} style={{ width: 200, height: 50, margin: 20 }}>
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
                    <Button className='btn' onClick={() => navigate('/sudoku/game/easy')}>
                        <h3>简单</h3>
                    </Button>
                    <Button className='btn' onClick={() => navigate('/sudoku/game/medium')}>
                        <h3>中等</h3>
                    </Button>
                    <Button className='btn' onClick={() => navigate('/sudoku/game/hard')}>
                        <h3>困难</h3>
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default Sudoku;
