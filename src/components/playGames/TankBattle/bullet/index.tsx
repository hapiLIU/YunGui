import { useEffect, useState } from 'react';
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
            left: `${prop.positionMuzzle.x - (document.documentElement.clientWidth / 2 - 500)}px `,
        },
        // to: {
        //     // backgroundColor: "red",
        //     top: `${prop.mouseMove.y - (document.documentElement.clientHeight / 2 - 400)} px`,
        //     left: `${prop.mouseMove.x - (document.documentElement.clientWidth / 2 - 500)} px`,
        // },
        to: [
            {
                // top: `${prop.mouseMove.y - (document.documentElement.clientHeight / 2 - 400)} px`,
                // left: `${prop.mouseMove.x - (document.documentElement.clientWidth / 2 - 500)} px`,
                top: `${segmentsIntr({ x: prop.positionMuzzle.y - (document.documentElement.clientHeight / 2 - 400), y: prop.positionMuzzle.x - (document.documentElement.clientWidth / 2 - 500) }, { x: prop.mouseMove.y - (document.documentElement.clientHeight / 2 - 400), y: prop.mouseMove.x - (document.documentElement.clientWidth / 2 - 500) })!.x} px`,
                left: `${segmentsIntr({ x: prop.positionMuzzle.y - (document.documentElement.clientHeight / 2 - 400), y: prop.positionMuzzle.x - (document.documentElement.clientWidth / 2 - 500) }, { x: prop.mouseMove.y - (document.documentElement.clientHeight / 2 - 400), y: prop.mouseMove.x - (document.documentElement.clientWidth / 2 - 500) })!.y} px`,
            },
            {
                // backgroundColor: "red",
                display: "none"
            }
        ],
    });

    // 计算弧度
    const calculateAngle = (x1: number, y1: number, x2: number, y2: number): number => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const theta = Math.atan2(dy, dx); // 以弧度表示夹角
        const thetaDegrees = theta * (180 / Math.PI); // 将弧度转换为角度
        return (thetaDegrees + 90); // 返回计算得到的夹角（以角度表示）
    };

    // 计算交点
    function segmentsIntr(fromPoint: { x: number; y: number; }, toPoint: { x: number; y: number; }) {
        let borderA = { x: 0, y: 0 }   // {x:0,y:0},{x:1000,y:0},{x:1000,y:800},{x:0,y:800}
        let borderB = { x: 1000, y: 0 }   // {x:1000,y:0},{x:1000,y:800},{x:0,y:800},{x:0,y:0}

        if (rotate >= 45 && rotate < 135) {
            borderA = { x: 0, y: 1000 }
            borderB = { x: 800, y: 1000 }
        } else if (rotate >= 135 && rotate < 225) {
            borderA = { x: 800, y: 1000 }
            borderB = { x: 800, y: 0 }
        } else if ((rotate >= 225 && rotate <= 270) || (rotate >= -90 && rotate < -45)) {
            borderA = { x: 0, y: 0 }
            borderB = { x: 1000, y: 0 }
        } else if ((rotate >= -45 && rotate < 0) || (rotate >= 0 && rotate < 45)) {
            borderA = { x: 0, y: 800 }
            borderB = { x: 0, y: 0 }
        }

        /** 解线性方程组, 求线段交点. **/
        // 如果分母为0 则平行或共线, 不相交  
        let denominator = (borderB.y - borderA.y) * (toPoint.x - fromPoint.x) - (borderA.x - borderB.x) * (fromPoint.y - toPoint.y);
        if (denominator == 0) {
            return null;
        }

        // 线段所在直线的交点坐标 (x , y)      
        let x = ((borderB.x - borderA.x) * (toPoint.x - fromPoint.x) * (fromPoint.y - borderA.y)
            + (borderB.y - borderA.y) * (toPoint.x - fromPoint.x) * borderA.x
            - (toPoint.y - fromPoint.y) * (borderB.x - borderA.x) * fromPoint.x) / denominator;
        let y = -((borderB.y - borderA.y) * (toPoint.y - fromPoint.y) * (fromPoint.x - borderA.x)
            + (borderB.x - borderA.x) * (toPoint.y - fromPoint.y) * borderA.y
            - (toPoint.x - fromPoint.x) * (borderB.y - borderA.y) * fromPoint.y) / denominator;

        return { x, y }
    }


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