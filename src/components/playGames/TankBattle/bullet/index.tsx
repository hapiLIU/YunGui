import { useEffect, useRef, useState } from 'react';
import './index.scss';

const Bullet = (prop: any) => {
    const [muzzle, setMuzzle] = useState({ x: 0, y: 0 })    //  炮口坐标
    const [positionMuzzle, setPositionMuzzle] = useState({ top: 0, left: 0 })    //  修改后炮口定位数值
    const [mouseMove, setMouseMove] = useState({ x: 0, y: 0 })    //  鼠标点击坐标
    const [position, setPosition] = useState({ top: 0, left: 0 })    //  修改后鼠标定位数值
    const [color, setColor] = useState("#000")

    useEffect(() => {
        setMuzzle(prop.positionMuzzle)
        setPositionMuzzle({ top: muzzle.y - (document.documentElement.clientHeight / 2 - 400), left: muzzle.x - (document.documentElement.clientWidth / 2 - 500) })
        setMouseMove(prop.mouseMove)
        setPosition({ top: mouseMove.y - (document.documentElement.clientHeight / 2 - 400), left: mouseMove.x - (document.documentElement.clientWidth / 2 - 500) })
        setColor(prop.color)
    }, [prop])

    return (
        // <div>
        //     <div className='mainBullet' id='mainBullet' style={{ backgroundColor: color, top: `${positionMuzzle.top}px`, left: `${positionMuzzle.left}px` }}></div>
        //     <div className='mainBullet' id='mainBullet' style={{ backgroundColor: color, top: `${position.top}px`, left: `${position.left}px` }}></div>
        // </div>
        <div className='mainBullet' id='mainBullet' style={{ backgroundColor: color, top: `${positionMuzzle.top}px`, left: `${positionMuzzle.left}px`, }}>
        </div>
        // <div className='mainBullet' id='mainBullet' style={{ backgroundColor: color, top: `${positionMuzzle.top}px`, left: `${positionMuzzle.left}px`, }}></div>
        // <div className='mainBullet' id='mainBullet' style={{ backgroundColor: color, top: `${position.top}px`, left: `${position.left}px` }}></div>
    );
}

export default Bullet;