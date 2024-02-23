import { useEffect, useRef, useState } from 'react'
import './index.scss'

export default function Canvas() {
    const canvasContent = { //  canvas内容区宽高
        width: 1200, height: 900
    }
    const pointArr = useRef<{ x: number, y: number }[]>([])   // 点数组
    const lineArr = useRef<any[]>([])   // 线数组
    const [isDrawLine, setIsDrawLine] = useState<boolean>(false)   // 是否画线
    let mouse = useRef({ x: 0, y: 0 }) // canvas区内的鼠标坐标

    // 画网格
    const drawGrid = (ctx: any, canvasContent: { width: number; height: number }) => {
        ctx.save();//新建一个绘图状态
        //设置一些参数
        ctx.strokeStyle = "lightgray";//设置线条颜色
        ctx.lineWidth = 0.5; //绘制线条的宽度
        // 水平方向
        let x = 20, y = 20
        while (y < canvasContent.height) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasContent.width, y);
            ctx.stroke();
            y += 20
        }
        // 垂直方向
        while (x < canvasContent.width) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasContent.height);
            ctx.stroke();
            x += 20
        }
        ctx.restore();//返回"新建sava()"之前的画布状态
    }
    // 画十字线
    const drawCross = (ctx: any, canvasContent: { width: number; height: number }, x: number, y: number) => {
        ctx.save();//新建一个绘图状态
        // 绘制十字线
        let text = `( ${Math.round(x)}  , ${Math.round(y)} )`
        let textSize = ctx.measureText(text);
        let textX = x + 10; // 右偏移量以离开鼠标点
        let textY = y - 10; // 上偏移量以放在鼠标点上方

        //判断 如果 x 靠近右侧边缘 , y靠近上册边缘 
        if (x >= canvasContent.width - 80) {
            textX = x - 80
        }

        if (y < 50) {
            textY = y + 30
        }

        ctx.fillStyle = 'red';// 设置文本颜色为红色
        ctx.fillText(text, textX, textY);


        // 设置十字线的颜色和粗细

        ctx.strokeStyle = '#FF0000'; // 示例颜色为红色

        ctx.lineWidth = 1; // 示例设置更明显的线宽

        // 水平线
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasContent.height);
        ctx.stroke();

        // 垂直线
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasContent.width, y);
        ctx.stroke();

        ctx.restore();//返回"新建sava()"之前的画布状态
    }
    // 在点击位置画圈
    const drawArc = (ctx: any, canvasContent: { width: number; height: number }, mouse: { x: number, y: number }) => {
        ctx.save();//新建一个绘图状态
        ctx.strokeStyle = "#0aa4de"
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 0.5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();//返回"新建sava()"之前的画布状态
    }

    useEffect(() => {
        const canvas: any = document.getElementById('myCanvas')
        const ctx = canvas.getContext("2d");

        // canvas区域内鼠标移动事件
        canvas.addEventListener('mousemove', (e: any) => {
            let rect = canvas.getBoundingClientRect();
            // mouse.current.x = e.clientX - rect.left;
            // mouse.current.y = e.clientY - rect.top;
            mouse.current.x = e.clientX - rect.left - 4;
            mouse.current.y = e.clientY - rect.top - 4;
        })
        // canvas区域内鼠标按下事件
        canvas.addEventListener("mousedown", (e: any) => {
            setIsDrawLine(true)
            let rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left - 4;
            let y = e.clientY - rect.top - 4;
            // 去重
            if (!pointArr.current.some((item: { x: number, y: number }) => item.x === x && item.y === y)) {
                pointArr.current = [...pointArr.current, { x, y }]
            }

            // canvas区域内鼠标抬起事件
            canvas.addEventListener("mouseup", (e: any) => {
                setIsDrawLine(false)
                let rect = canvas.getBoundingClientRect();
                let x = e.clientX - rect.left - 4;
                let y = e.clientY - rect.top - 4;
                if (!pointArr.current.some((item: { x: number, y: number }) => item.x === x && item.y === y)) {
                    pointArr.current = [...pointArr.current, { x, y }]
                }
            })
        })

        animate();//循环动画函数 
        function animate() {
            ctx.clearRect(0, 0, canvasContent.width, canvasContent.height);
            //设置网格线
            drawGrid(ctx, canvasContent)
            // 画十字线
            drawCross(ctx, canvasContent, mouse.current.x, mouse.current.y)

            pointArr.current.forEach(item => {
                drawArc(ctx, canvasContent, item)
            })

            requestAnimationFrame(animate);//每隔16.67ms去调用
        }
    }, [])
    return (
        <div className='canvas'>
            <canvas className='content' id='myCanvas' width={canvasContent.width} height={canvasContent.height}></canvas>
        </div>
    )
}