import { useEffect, useState } from 'react';
import './index.scss'

export default function Watch() {
    const [years, setYears] = useState<number>() // 年
    const [months, setMonths] = useState<string>() // 月
    const [days, setDays] = useState<string>() // 日
    const [hours, setHours] = useState<string>() // 时
    const [minutes, setMinutes] = useState<string>() // 分
    const [seconds, setSeconds] = useState<string>() // 秒

    const showTime = () => {
        let date = new Date();
        let year: number = date.getFullYear(); // 年
        let month: string = ('0' + (date.getMonth() + 1)).slice(-2); // 月
        let day: string = ('0' + date.getDate()).slice(-2); // 日
        let hour: string = ('0' + date.getHours()).slice(-2); // 0 - 23  
        let minute: string = ('0' + date.getMinutes()).slice(-2); // 0 - 59
        let second: string = ('0' + date.getSeconds()).slice(-2); // 0 - 59

        setYears(year)
        setMonths(month)
        setDays(day)
        setHours(hour)
        setMinutes(minute)
        setSeconds(second)

        setTimeout(showTime, 200)
    }

    useEffect(() => {
        showTime()
    }, [])

    return (
        <div className="clock">
            <div className='HMS'>
                <div><span>{hours}</span>Hours</div>
                <div><span>{minutes}</span>Minutes</div>
                <div><span>{seconds}</span>Seconds</div>
            </div>
            <div className='YMD'>
                <span>{years}</span>-<span>{months}</span>-<span>{days}</span>
            </div>
        </div>
    )
}