import { useEffect, useState } from 'react';
import './index.scss'
import { getLunarCalendar } from '../../services/hooks/perpetualCalendar';

export default function Watch() {
    const [years, setYears] = useState<number>(2000) // 年
    const [months, setMonths] = useState<string>('08') // 月
    const [days, setDays] = useState<string>('16') // 日
    const [hours, setHours] = useState<string>('00') // 时
    const [minutes, setMinutes] = useState<string>('00') // 分
    const [seconds, setSeconds] = useState<string>('00') // 秒
    const [holidays, setHolidays] = useState<string>('')

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

    const getHolidays = () => {
        let date = new Date();
        let year: number = date.getFullYear();
        let month: number = date.getMonth() + 1;
        let day: number = date.getDate();
        // let a = useHolidayAndSolarTerm(date)
        // console.log(a)
        const lunarHolidays = getLunarCalendar(year, Number(month), Number(day))
        const lunar = lunarHolidays.lunar ?? ''
        setHolidays(`${lunarHolidays.cly}年  ${lunarHolidays.ZodiacSigns}  ${lunarHolidays.clm}${lunarHolidays.cld}${lunar ? ' ' + lunar : ''}`)
    }

    useEffect(() => {
        showTime()
        getHolidays()
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
            <div className='holiday'>
                {holidays}
            </div>
        </div>
    )
}