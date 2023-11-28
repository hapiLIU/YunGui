import { useEffect, useRef, useState } from 'react';
import './index.scss';

const Tank = (prop: any) => {
    const [rotate, setRotate] = useState(prop.rotate) // 炮杆角度
    const [rotateTank, setRotateTank] = useState(prop.rotate) // tank角度
    const [positionLeft, setPositionLeft] = useState<number>(0) // tank位置
    const [positionTop, setPositionTop] = useState<number>(0) // tank位置
    const [isMove, setIsMove] = useState<boolean>(true) // 按键按下移动,松开停止
    useEffect(() => {
        setRotate(prop.rotate)
        setRotateTank(prop.rotateTank)
        setPositionLeft(prop.positionLeft)
        setPositionTop(prop.positionTop)
        setIsMove(prop.isMove)
        getCoordinate()
    }, [prop])

    // 获取中心元素坐标
    const getCoordinate = () => {
        // 获取元素  
        let element = document.getElementById('centerPoint');
        let rect = element?.getBoundingClientRect()
        let centerX = rect?.x
        let centerY = rect?.y
        // console.log(centerX, centerY)
        prop.getConter(centerX, centerY)
    }

    useEffect(() => {
        getCoordinate()
    }, [])

    return (
        <div className='mainTank' style={{ transform: `rotate(${rotateTank ? rotateTank : 0}deg)`, top: positionTop, left: positionLeft }}>
            <div className='tank-tire'>
                <div className='pattern1' style={{ animationPlayState: isMove ? 'running' : 'paused' }}></div>
            </div>
            <div className='tank-fuselage'>
                <div className='tank-Battery'>
                    <div className='tank-Battery2'>
                        <div className='tank-Battery3' id='centerPoint'></div>
                    </div>
                </div>
            </div>
            <div className='tank-cannonBarrel' style={{ transform: `rotate(${rotate ? rotate : 0}deg)` }}></div>
            <div className='tank-rearCabin'></div>
            <div className='tank-tire'>
                <div className='pattern2' style={{ animationPlayState: isMove ? 'running' : 'paused' }}></div>
            </div>
        </div>
    );
}

export default Tank;
