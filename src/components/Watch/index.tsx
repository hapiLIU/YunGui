import { useEffect } from 'react';
import './index.scss'

export default function Watch() {

    const showTime = () => {
        let date = new Date();
        let year: any = date.getFullYear(); // 年
        let month: any = ('0' + (date.getMonth() + 1)).slice(-2); // 月
        let day: any = ('0' + date.getDate()).slice(-2); // 日
        let hour: any = ('0' + date.getHours()).slice(-2); // 0 - 23  
        let minute: any = ('0' + date.getMinutes()).slice(-2); // 0 - 59
        let second: any = ('0' + date.getSeconds()).slice(-2); // 0 - 59

        let years: any = document.getElementById("years")
        let months: any = document.getElementById("months")
        let days: any = document.getElementById("days")
        let hours: any = document.getElementById("hours")
        let minutes: any = document.getElementById("minutes")
        let seconds: any = document.getElementById("seconds")

        years.innerText = year
        years.textContent = year
        months.innerText = month
        months.textContent = month
        days.innerText = day
        days.textContent = day
        hours.innerText = hour
        hours.textContent = hour
        minutes.innerText = minute
        minutes.textContent = minute
        seconds.innerText = second
        seconds.textContent = second

        setTimeout(showTime, 1000);
    }

    useEffect(() => {
        showTime()
    }, [])

    return (
        <div id="MyClockDisplay" className="clock">
            <div className='HMS'>
                <div><span id="hours"></span>Hours</div>
                <div><span id="minutes"></span>Minutes</div>
                <div><span id="seconds"></span>Seconds</div>
            </div>
            <div className='YMD'>
                <span id="years"></span>-<span id="months"></span>-<span id="days"></span>
            </div>
        </div>
    )
}