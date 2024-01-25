import { Button } from 'antd'
import './index.scss'
import { useEffect, useState } from 'react'

/**
 * name：节日名称
 * calendar ：SolarCalendar（阳历）/LunarCalendar（阴历）
 * year：可不填，month：可不填,day：必填
 * falling：Array，掉落的物品
 */
import ImportantFestivals from './节日列表.json'

import { getLunarCalendar } from '../../services/hooks/perpetualCalendar'
import { CloseCircleOutlined } from '@ant-design/icons'

export default function FallingFlowers() {
    const date = new Date()
    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();
    let lunar = getLunarCalendar(year, month, day)

    const [icons, setIcons] = useState<any[]>([])
    // const [icons, setIcons] = useState<any[]>(["🎈", "🌹", "🌸", "🌷", "🌺"])

    const [isClose, setIsClose] = useState<boolean>(false)  //  是否关闭落花
    const [keys, setKeys] = useState<boolean>(false)

    useEffect(() => {
        const createRainName = () => {
            let span = document.createElement("span");
            span.className = "iconRain";
            span.textContent = icons[Math.floor(Math.random() * icons.length)];
            span.style.left = (Math.random() * (window.innerWidth - span.offsetWidth - 50)) + "px";
            span.style.animationDelay = (Math.random() * 3) + "s";
            span.style.animationDuration = (3 + Math.random() * 3) + "s";

            document.querySelector(".falling-flowers")!.appendChild(span);
        }
        let numberOfNames = 30;
        if (icons.length > 0) {
            for (let i = 0; i < numberOfNames; i++) {
                createRainName();
            }
        }
    }, [icons])

    useEffect(() => {
        festivalsChange()
        setKeys(pre => !pre)
    }, [])

    // 查询节日
    const festivalsChange = () => {
        ImportantFestivals.forEach(item => {
            if (item.calendar == "SolarCalendar") {
                // 查询阳历节日
                if (((item.year && item.year == year) || !item.year) && ((item.month && item.month == month) || !item.month) && (item.day && item.day == day)) {
                    setIcons(item.falling)
                }
            } else if (item.calendar == "LunarCalendar") {
                // 查询农历节日
                if (((item.year && item.year == lunar.ly) || !item.year) && ((item.month && item.month == lunar.lm) || !item.month) && (item.day && item.day == lunar.ld)) {
                    setIcons(item.falling)
                }
            } else {
                console.error(item.name + 'calendar编写错误')
            }
        })
    }

    // 监听是否关闭落花的字段变化，来开关落花
    useEffect(() => {
        if (isClose) {
            setIcons([])
            // 获取所有 class="example" 的元素节点
            let elements = document.querySelectorAll('.falling-flowers');

            // 循环执行，直到没有 span 子元素为止
            while (true) {
                var hasSpans = false;
                // 遍历每个元素并移除
                for (let i = 0; i < elements.length; i++) {
                    let ele: any = elements[i];
                    // 获取元素中的所有 span 子元素
                    let spanElements = ele.getElementsByClassName('iconRain');
                    // 如果存在 span 子元素，则标记为需要再次执行循环
                    if (spanElements.length > 0) {
                        hasSpans = true;
                        // 遍历每个 span 子元素并移除
                        for (let j = 0; j < spanElements.length; j++) {
                            let spanElement = spanElements[j];
                            spanElement.parentNode.removeChild(spanElement); // 从 DOM 结构中移除该 span 元素
                        }
                    }
                }
                // 如果不存在 span 子元素，则跳出循环
                if (!hasSpans) {
                    break;
                }
            }
        } else {
            festivalsChange()
            setKeys(pre => !pre)
        }
    }, [isClose])

    return (
        <div className='falling-flowers' key={keys ? "aa" : "bb"}>
            <Button className='switch' onClick={() => setIsClose(pre => !pre)} title='关闭落花' icon={<CloseCircleOutlined />} type="text" ghost></Button>
        </div>
    )
}