import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import Tank from './tank';
import Bullet from './bullet';
import ReactDOM from 'react-dom';

const TankBattle = () => {
    const [mouseMove, setMouseMove] = useState({ x: 0, y: 0 })
    // console.log(mouseMove)
    const [rotate, setRotate] = useState<number>(0) // 传给子元素的炮杆夹角角度
    const [rotateTank, setRotateTank] = useState(0) // tank角度
    const [centerX, setCenterX] = useState<number>(0) // tank中心的坐标
    const [centerY, setCenterY] = useState<number>(0) // tank中心的坐标

    const [positionLeft, setPositionLeft] = useState<number>(0) // tank位置
    const [positionTop, setPositionTop] = useState<number>(0) // tank位置

    const [isMove, setIsMove] = useState<boolean>(false) // 按键按下移动,松开停止

    const [positionMuzzle, setPositionMuzzle] = useState<any>({ x: 0, y: 0 }) // 炮口坐标位置

    const [elements, setElements] = useState<any>([]);

    // 鼠标移动计算夹角角度
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = event;
        setMouseMove({ x: clientX, y: clientY })
        setRotate(calculateAngle(centerX, centerY, clientX, clientY))

        // 获取元素  
        let element = document.getElementById('muzzle');
        let rect = element?.getBoundingClientRect()
        let muzzleCenterX = rect?.x
        let muzzleCenterY = rect?.y
        changeMuzzle(muzzleCenterX!, muzzleCenterY!)
    };

    // 计算弧度
    const calculateAngle = (x1: number, y1: number, x2: number, y2: number): number => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const theta = Math.atan2(dy, dx); // 以弧度表示夹角
        const thetaDegrees = theta * (180 / Math.PI); // 将弧度转换为角度
        return (thetaDegrees + 90) - rotateTank; // 返回计算得到的夹角（以角度表示）
    };

    // 改变中心点
    const changeConter = (x: number, y: number) => {
        setCenterX(x);
        setCenterY(y);
    }
    // 改变炮口坐标
    const changeMuzzle = (x: number, y: number) => {
        setPositionMuzzle({ x, y })
    }

    // 捕获按键按下
    document.onkeydown = (e) => {
        switch (e.keyCode) {
            case 38:
                setPositionTop((positionTop - 3) > 0 ? positionTop - 3 : positionTop)
                setRotateTank(0)
                setIsMove(true)
                break;
            case 87:
                setPositionTop((positionTop - 3) > 0 ? positionTop - 3 : positionTop)
                setRotateTank(0)
                setIsMove(true)
                break;
            case 40:
                setPositionTop((positionTop + 3) < 750 ? positionTop + 3 : positionTop)
                setRotateTank(180)
                setIsMove(true)
                break;
            case 83:
                setPositionTop((positionTop + 3) < 750 ? positionTop + 3 : positionTop)
                setRotateTank(180)
                setIsMove(true)
                break;
            case 37:
                setPositionLeft((positionLeft - 3) > 0 ? positionLeft - 3 : positionLeft)
                setRotateTank(270)
                setIsMove(true)
                break;
            case 65:
                setPositionLeft((positionLeft - 3) > 0 ? positionLeft - 3 : positionLeft)
                setRotateTank(270)
                setIsMove(true)
                break;
            case 39:
                setPositionLeft((positionLeft + 3) < 950 ? positionLeft + 3 : positionLeft)
                setRotateTank(90)
                setIsMove(true)
                break;
            case 68:
                setPositionLeft((positionLeft + 3) < 950 ? positionLeft + 3 : positionLeft)
                setRotateTank(90)
                setIsMove(true)
                break;
        }
    }
    // 捕获按键松开
    document.onkeyup = () => {
        setIsMove(false)
    }

    // 鼠标按下射出炮弹
    const transmit = () => {
        console.log(mouseMove)
        setElements([...elements, { key: Date.now(), positionMuzzle: positionMuzzle, mouseMove: mouseMove, color: '#000' }])
    }

    return (
        <div className='mainTankBattle'>
            <div className='tankBattle-game' id='gameArea' onMouseMove={handleMouseMove} onClick={transmit}>
                <div className='tankDiv' id='tank'>
                    <Tank rotate={rotate} rotateTank={rotateTank} positionTop={positionTop} positionLeft={positionLeft} isMove={isMove} getConter={(x: number, y: number) => { changeConter(x, y) }} getMuzzle={(x: number, y: number) => { changeMuzzle(x, y) }} />
                </div>
                {elements.map((item: any) => (
                    <Bullet key={item.key} index={item.key} positionMuzzle={item.positionMuzzle} mouseMove={item.mouseMove} color={item.color} />
                ))}
            </div>
        </div>
    );
}

export default TankBattle;