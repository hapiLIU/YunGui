import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { animated, useSpring } from '@react-spring/web'

const Bullet = (prop: any) => {
    const [index, setIndex] = useState(0)    //  ID/INDEX
    const [muzzle, setMuzzle] = useState({ x: 0, y: 0 })    //  炮口坐标
    const [positionMuzzle, setPositionMuzzle] = useState({ top: 0, left: 0 })    //  修改后炮口定位数值
    const [mouseMove, setMouseMove] = useState({ x: 0, y: 0 })    //  鼠标点击坐标
    const [position, setPosition] = useState({ top: 0, left: 0 })    //  修改后鼠标定位数值
    const [color, setColor] = useState("#000")  //  炮弹颜色
    const [rotate, setRotate] = useState(0)  //  炮弹弧度

    useEffect(() => {
        setIndex(prop.index)
        setMuzzle(prop.positionMuzzle)
        setPositionMuzzle({ top: prop.positionMuzzle.y - (document.documentElement.clientHeight / 2 - 400), left: prop.positionMuzzle.x - (document.documentElement.clientWidth / 2 - 500) })
        setMouseMove(prop.mouseMove)
        setPosition({ top: prop.mouseMove.y - (document.documentElement.clientHeight / 2 - 400), left: prop.mouseMove.x - (document.documentElement.clientWidth / 2 - 500) })
        setColor(prop.color)

        setRotate(calculateAngle(prop.positionMuzzle.x, prop.positionMuzzle.y, prop.mouseMove.x, prop.mouseMove.y))

        newStyle()
    }, [prop])

    const keyframeRule = useSpring({
        from: {
            top: `${prop.positionMuzzle.y - (document.documentElement.clientHeight / 2 - 400)}px`,
            left: `${prop.positionMuzzle.x - (document.documentElement.clientWidth / 2 - 500)}px `
        },
        to: {
            top: `${prop.mouseMove.y - (document.documentElement.clientHeight / 2 - 400)} px`,
            left: `${prop.mouseMove.x - (document.documentElement.clientWidth / 2 - 500)} px`
        },
    });

    // 计算弧度
    const calculateAngle = (x1: number, y1: number, x2: number, y2: number): number => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const theta = Math.atan2(dy, dx); // 以弧度表示夹角
        const thetaDegrees = theta * (180 / Math.PI); // 将弧度转换为角度
        return (thetaDegrees + 90); // 返回计算得到的夹角（以角度表示）
    };

    const newStyle = () => {
        let element = document.getElementById(`mainBullet${index}`)

        // 将样式应用于目标元素
        element!.style.animation = "myKeyFrames 0";
    }

    return (
        <animated.div className='mainBullet' id={`mainBullet${index}`} style={{ backgroundColor: color, transform: `rotate(${rotate ? rotate : 0}deg)`, ...keyframeRule }}></animated.div>
        // <animated.div className='mainBullet' id={`mainBullet${index}`} style={{ backgroundColor: color, ...keyframeRule }}>{position.top},{position.left}/{positionMuzzle.top},{positionMuzzle.left}</animated.div>
    );
}

export default Bullet;