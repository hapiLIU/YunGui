import FloatMenu from '../FloatMenu'
import './index.scss'

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ThreeJs() {
    const navigate = useNavigate()
    return (
        <div className='threeMenu'>
            <Button className='menuBtn' title='testOne' onClick={() => navigate('/threejs/testOne')}>One</Button>
            <Button className='menuBtn' title='testTwo' onClick={() => navigate('/threejs/testTwo')}>Two</Button>
            <Button className='menuBtn' title='testThree' onClick={() => navigate('/threejs/testThree')}>Three</Button>
            <FloatMenu />
        </div>
    )
}