import { useState, useEffect } from "react";

// 万年历，可以获取当前日期、节假日、节气
export function useHolidayAndSolarTerm(date?: Date | string) {
  const today = date ? new Date(date) : new Date();
  const [holidays, setHolidays] = useState<any>(null);
  const [solarTerms, setSolarTerms] = useState<any>(null);

  useEffect(() => {
    const holidaysList = getHolidays(today);
    const solarTermsList = getSolarTerms(today);
    setHolidays(holidaysList);
    setSolarTerms(solarTermsList);
  }, []);

  return { today, holidays, solarTerms };
}

// ! 获取节假日列表
const getHolidays = (date: Date) => {
  let result: any = {
    gregorianCalendarHoliday: null, // 公历节日
    weeklyCalendarHoliday: null, // 周历节日
    lunarCalendarHoliday: null, // 农历节日
  };
  let year: number = date.getFullYear();
  let month: number = date.getMonth() + 1;
  let day: number = date.getDate();
  // ! 获取公历节日
  let gF = getGregorianCalendar(month, day);
  if (gF) {
    result.gregorianCalendarHoliday = gF;
  }

  // ! 获取周历节日
  let wF = getWeeklyCalendar(year, month, day);
  if (wF) {
    result.weeklyCalendarHoliday = wF;
  }

  // !  获取农历节日
  let lF = getLunarCalendar(year, month, day);
  if (lF) {
    result.lunarCalendarHoliday = lF.lunar;
  }

  return result;
};

// ! 获取公历（阳历）节日
const getGregorianCalendar = (month: number, day: number) => {
  let result: string = "";
  let gFtv = [
    "0101 元旦",
    "0214 情人节",
    "0307 女生节",
    "0308 妇女节",
    "0312 植树节",
    "0401 愚人节",
    "0404 清明节",
    "0501 劳动节",
    "0504 青年节",
    "0601 儿童节",
    "0701 建党节",
    "0801 建军节",
    "0910 教师节",
    "1001 国庆节",
    "1031 万圣节",
    "1224 平安夜",
    "1225 圣诞节",
  ];
  gFtv.forEach((item) => {
    if (item.match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
      let reg: any = item.match(/^(\d{2})(\d{2})([\s\*])(.+)$/);
      if (Number(reg[1]) == month && Number(reg[2]) == day) {
        result = reg[4];
        return;
      }
    }
  });
  return result;
};
// ! 获取周历节日
const getWeeklyCalendar = (year: number, month: number, day: number) => {
  let result: string = "";
  //定义周历节日
  //某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
  let wFtv = [
    "0420 复活节", //在每年春分月圆之后第一个星期日 耶穌受難節是復活節前一个星期五
    "0520 母亲节", //每年5月的第二个星期日
    "0950 世界心脏日", //最后一个星期日
    "0630 父亲节", //每年公历6月的第三个星期日
    "1144 感恩节", //1月的第四个星期四庆祝感恩节
  ];
  // 周节日
  wFtv.forEach((item) => {
    if (item.match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
      let reg: any = item.match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/);
      if (reg[1] == month) {
        let firstWeek = new Date(year + "/" + month + "/" + "01").getDay();
        let tmp1 = reg[2];
        let tmp2 = reg[3];
        if (tmp1 < 5) {
          let days =
            (firstWeek > tmp2 ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - firstWeek + 1;
          if (day == days) {
            result = reg[5];
            return;
          }
        } else {
          tmp1 -= 5;
          let nowMonthTime = new Date(
            year + "/" + month + "/" + "01"
          ).getTime();
          let nextMonthTime = new Date(
            year + "/" + (month + 1) + "/" + "01"
          ).getTime();
          let countDays = (nextMonthTime - nowMonthTime) / 24 / 60 / 60 / 1000;
          let tmp3 = (firstWeek + countDays - 1) % 7; //当月最后一天星期几
          let days = countDays - tmp3 - 7 * tmp1 + tmp2 - (tmp2 > tmp3 ? 7 : 0);
          if (day == days) {
            result = reg[5];
            return;
          }
        }
      }
    }
  });
  return result;
};
// !  获取农历及农历节日
export const getLunarCalendar = (year: number, month: number, day: number) => {
  // 农历查询表
  const lunarYearArr = [
    0x04bd8,
    0x04ae0,
    0x0a570,
    0x054d5,
    0x0d260,
    0x0d950,
    0x16554,
    0x056a0,
    0x09ad0,
    0x055d2, //1900-1909
    0x04ae0,
    0x0a5b6,
    0x0a4d0,
    0x0d250,
    0x1d255,
    0x0b540,
    0x0d6a0,
    0x0ada2,
    0x095b0,
    0x14977, //1910-1919
    0x04970,
    0x0a4b0,
    0x0b4b5,
    0x06a50,
    0x06d40,
    0x1ab54,
    0x02b60,
    0x09570,
    0x052f2,
    0x04970, //1920-1929
    0x06566,
    0x0d4a0,
    0x0ea50,
    0x06e95,
    0x05ad0,
    0x02b60,
    0x186e3,
    0x092e0,
    0x1c8d7,
    0x0c950, //1930-1939
    0x0d4a0,
    0x1d8a6,
    0x0b550,
    0x056a0,
    0x1a5b4,
    0x025d0,
    0x092d0,
    0x0d2b2,
    0x0a950,
    0x0b557, //1940-1949
    0x06ca0,
    0x0b550,
    0x15355,
    0x04da0,
    0x0a5b0,
    0x14573,
    0x052b0,
    0x0a9a8,
    0x0e950,
    0x06aa0, //1950-1959
    0x0aea6,
    0x0ab50,
    0x04b60,
    0x0aae4,
    0x0a570,
    0x05260,
    0x0f263,
    0x0d950,
    0x05b57,
    0x056a0, //1960-1969
    0x096d0,
    0x04dd5,
    0x04ad0,
    0x0a4d0,
    0x0d4d4,
    0x0d250,
    0x0d558,
    0x0b540,
    0x0b6a0,
    0x195a6, //1970-1979
    0x095b0,
    0x049b0,
    0x0a974,
    0x0a4b0,
    0x0b27a,
    0x06a50,
    0x06d40,
    0x0af46,
    0x0ab60,
    0x09570, //1980-1989
    0x04af5,
    0x04970,
    0x064b0,
    0x074a3,
    0x0ea50,
    0x06b58,
    0x055c0,
    0x0ab60,
    0x096d5,
    0x092e0, //1990-1999
    0x0c960,
    0x0d954,
    0x0d4a0,
    0x0da50,
    0x07552,
    0x056a0,
    0x0abb7,
    0x025d0,
    0x092d0,
    0x0cab5, //2000-2009
    0x0a950,
    0x0b4a0,
    0x0baa4,
    0x0ad50,
    0x055d9,
    0x04ba0,
    0x0a5b0,
    0x15176,
    0x052b0,
    0x0a930, //2010-2019
    0x07954,
    0x06aa0,
    0x0ad50,
    0x05b52,
    0x04b60,
    0x0a6e6,
    0x0a4e0,
    0x0d260,
    0x0ea65,
    0x0d530, //2020-2029
    0x05aa0,
    0x076a3,
    0x096d0,
    0x04afb,
    0x04ad0,
    0x0a4d0,
    0x1d0b6,
    0x0d250,
    0x0d520,
    0x0dd45, //2030-2039
    0x0b5a0,
    0x056d0,
    0x055b2,
    0x049b0,
    0x0a577,
    0x0a4b0,
    0x0aa50,
    0x1b255,
    0x06d20,
    0x0ada0, //2040-2049
    0x14b63,
    0x09370,
    0x049f8,
    0x04970,
    0x064b0,
    0x168a6,
    0x0ea50,
    0x06b20,
    0x1a6c4,
    0x0aae0, //2050-2059
    0x0a2e0,
    0x0d2e3,
    0x0c960,
    0x0d557,
    0x0d4a0,
    0x0da50,
    0x05d55,
    0x056a0,
    0x0a6d0,
    0x055d4, //2060-2069
    0x052d0,
    0x0a9b8,
    0x0a950,
    0x0b4a0,
    0x0b6a6,
    0x0ad50,
    0x055a0,
    0x0aba4,
    0x0a5b0,
    0x052b0, //2070-2079
    0x0b273,
    0x06930,
    0x07337,
    0x06aa0,
    0x0ad50,
    0x14b55,
    0x04b60,
    0x0a570,
    0x054e4,
    0x0d160, //2080-2089
    0x0e968,
    0x0d520,
    0x0daa0,
    0x16aa6,
    0x056d0,
    0x04ae0,
    0x0a9d4,
    0x0a2d0,
    0x0d150,
    0x0f252, //2090-2099
    0x0d520, //2100
  ];
  // 天干
  const tianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  // 地支
  const diZhi = [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥",
  ];
  // 生肖
  const ChineseZodiacSigns = [
    "鼠",
    "牛",
    "虎",
    "兔",
    "龙",
    "蛇",
    "马",
    "羊",
    "猴",
    "鸡",
    "狗",
    "猪",
  ];
  // 农历月
  const lunarMonth = [
    "正",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "冬",
    "腊",
  ];
  // 农历日
  const lunarDay = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "初",
    "廿",
  ];
  // 格式化日期
  const week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const formatDate = function (time: string | number | Date, type: boolean) {
    const date = new Date(time);
    const y = date.getFullYear();
    const m =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const w = date.getDay();
    const wStr = week[w];
    if (type) {
      return {
        year: y,
        month: m,
        day: d,
        week: w,
        weekStr: wStr,
      };
    } else {
      return y + "-" + m + "-" + d;
    }
  };
  // 基准年
  const BENCHMARK_YEAR = 1900;
  // 基准时间戳(国际零时区毫秒)
  const BENCHMARK_TIME = Date.UTC(BENCHMARK_YEAR, 0, 30);

  /**
   * 计算农历年是否有闰月, 参数为存储农历年的16进制
   * @param {Number} ly
   * @return {Boolean}
   * @eg {Function} hasLeapMonth(0x0b557)
   */
  const hasLeapMonth: any = function (ly: number) {
    //农历低四位不等于0即为存在闰月
    //存在闰月即返回闰月所在月份
    if (ly & 0x0000f) {
      return ly & 0x0000f;
    } else {
      return false;
    }
  };

  /**
   * 计算农历闰月天数, 参数为存储农历年的16进制
   * @param {Number} ly
   * @return {Number}
   * @eg {Function} leapMonthDays(0x0b557)
   */
  const leapMonthDays = function (ly: number) {
    //农历高四位等于0即为闰小月29天, 不等于0(等于1)即为闰大月30天
    //存在闰月即返回闰月天数
    if (hasLeapMonth(ly)) {
      return ly & 0xf0000 ? 30 : 29;
    } else {
      return 0;
    }
  };

  /**
   * 计算农历一年的总天数, 参数为存储农历年的16进制
   * @param {Number} ly
   * @return {Number}
   * @eg {Function} lunarYearDays(0x0b557)
   */
  const lunarYearDays = function (ly: number) {
    //从高位第16位(1月)起向右移至低位第5位(12月)累加天数
    let totalDays = 0;
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      let monthDays = ly & i ? 30 : 29;
      totalDays += monthDays;
    }
    //考虑是否有闰月天数
    if (hasLeapMonth(ly)) {
      totalDays += leapMonthDays(ly);
    }
    return totalDays;
  };

  /**
   * 计算农历每个月的天数, 参数为存储农历年的16进制
   * @param {Number} ly
   * @return {Array}
   * @eg {Function} lunarYearMonths(0x0b557)
   */
  const lunarYearMonths = function (ly: number) {
    //从高位第16位(1月)起向右移至低位第5位(12月)添加数组每项
    let monthArr: any = [];
    for (let i = 0x8000; i > 0x8; i >>= 1) {
      monthArr.push(ly & i ? 30 : 29);
    }
    //考虑是否有闰月天数
    if (hasLeapMonth(ly)) {
      monthArr.splice(hasLeapMonth(ly), 0, leapMonthDays(ly));
    }
    return monthArr;
  };

  // 将农历年转换为天干, 参数为存储农历年的16进制
  const getTianGan = function (ly: number) {
    let tianGanKey = (ly - 3) % 10;
    if (tianGanKey === 0) tianGanKey = 10;
    return tianGan[tianGanKey - 1];
  };

  // 将农历年转换为地支, 参数为存储农历年的16进制
  const getDiZhi = function (ly: number) {
    let diZhiKey = (ly - 3) % 12;
    if (diZhiKey === 0) diZhiKey = 12;
    return diZhi[diZhiKey - 1];
  };

  // 获取农历年所属生肖, 参数为存储农历年的16进制
  const getZodiacSigns = function (ly: number) {
    let ZSKey = (ly - 3) % 12;
    if (ZSKey === 0) ZSKey = 12;
    return ChineseZodiacSigns[ZSKey - 1];
  };

  // 根据农历年月日计算农历节日
  const getLunarFestival = (ly: number, lm: number, ld: number) => {
    // 初始化农历节日数组
    const lunarFestival = [
      "0101 春节",
      "0107 人胜节",
      "0115 元宵节",
      "0120 天穿节",
      "0125 天仓节",
      "0201 中和节",
      "0202 春龙节(龙抬头)",
      "0212 花朝节",
      "0303 上巳节",
      "0408 浴佛节",
      "0505 端午节",
      "0606 晒衣节",
      "0707 乞巧节(七夕)",
      "0715 中元节",
      "0801 天医节",
      "0815 中秋节",
      "0909 重阳节",
      "1001 寒衣节",
      "1015 下元节",
      "1208 腊八节",
      "1224 祭灶节(小年)",
    ];
    // 计算农历节日
    // ly lm ld 为农历年月日
    let lunar = null;
    lunarFestival.forEach((item, index) => {
      let str = item.split(" ");
      if (str[0] == `${lm < 10 ? "0" + lm : lm}${ld < 10 ? "0" + ld : ld}`) {
        lunar = str[1];
      }
      //部分节日需要手动计算例如春节前一天除夕，清明前一天寒食节等等
      //考虑到闰正月和闰腊月计算相对复杂这里仅做粗略计算，严谨请参照(平气法已过时)定气法具体百度搜索相关资料做调整
      let lymArr = lunarYearMonths(lunarYearArr[ly - BENCHMARK_YEAR]);
      if (`${lm}${ld}` == `12${lymArr[lymArr.length - 1]}`) {
        lunar = "除夕";
      }
    });
    return lunar;
  };

  /**
   * 主要实现方法入口, 参数为字符串格式日期或者时间戳(毫秒)
   * @param {String | Number} date
   * @return {Object}
   * @eg {Function} sloarToLunar("1949-01-29") || sloarToLunar(660268800000)
   */

  const sloarToLunar = function (date: any) {
    const time: any = formatDate(date, true);
    // 初始化农历年月日
    let ly: any, lm: any, ld: any;
    let cly: any, clm: any, cld: any;
    let ZodiacSigns: any; // 生肖
    // 初始化传入年月日
    let sy = time.year; // 阳历年份
    let sm = time.month; // 阳历月份
    let sd = time.day; // 阳历日
    if (sy <= BENCHMARK_YEAR || sy >= 2100) {
      return { code: 400, msg: "输入年限不在查询表范围", status: false };
    }
    // 计算与基准相差天数
    let differenceDay =
      (Date.UTC(Number(sy), Number(sm) - 1, Number(sd)) - BENCHMARK_TIME) /
      86400000; //24*60*60*1000;

    //计算农历年份
    for (let y = 0; y < lunarYearArr.length; y++) {
      differenceDay -= lunarYearDays(lunarYearArr[y]);
      if (differenceDay <= 0) {
        ly = BENCHMARK_YEAR + y;
        // 计算返回农历年份确定后的剩余天数(用于计算农历月)
        differenceDay += lunarYearDays(lunarYearArr[y]);
        break;
      }
    }

    //计算农历月份
    for (
      let m = 0;
      m < lunarYearMonths(lunarYearArr[ly - BENCHMARK_YEAR]).length;
      m++
    ) {
      differenceDay -= lunarYearMonths(lunarYearArr[ly - BENCHMARK_YEAR])[m];
      if (differenceDay <= 0) {
        // 有闰月时, 月份的数组长度会变成13, 因此, 当闰月月份小于等于m时, lm不需要加1
        if (
          hasLeapMonth(lunarYearArr[ly - BENCHMARK_YEAR]) &&
          hasLeapMonth(lunarYearArr[ly - BENCHMARK_YEAR]) <= m
        ) {
          if (hasLeapMonth(lunarYearArr[ly - BENCHMARK_YEAR]) < m) {
            lm = m;
          } else if (hasLeapMonth(lunarYearArr[ly - BENCHMARK_YEAR]) === m) {
            lm = "闰" + m;
          }
        } else {
          lm = m + 1;
        }
        // 获取农历月份确定后的剩余天数(用于计算农历日)
        differenceDay += lunarYearMonths(lunarYearArr[ly - BENCHMARK_YEAR])[m];
        break;
      }
    }

    //计算农历日
    ld = differenceDay;

    // ! 农历年月日转换
    // 将计算出来的农历月份转换成汉字月份, 闰月需要在前面加上闰字
    if (
      hasLeapMonth(lunarYearArr[ly - BENCHMARK_YEAR]) &&
      typeof lm === "string" &&
      lm.indexOf("闰") != -1
    ) {
      clm = `闰${lunarMonth[Number(lm.replace(/[^0-9]/gi, "")) - 1]}月`;
    } else {
      clm = `${lunarMonth[Number(lm) - 1]}月`;
    }
    // 将计算出来的农历年份转换为天干地支年
    cly = getTianGan(ly) + getDiZhi(ly);
    //  获取生肖
    ZodiacSigns = getZodiacSigns(ly);

    // 将计算出来的农历天数转换成汉字
    if (ld < 11) {
      cld = `${lunarDay[10]}${lunarDay[ld - 1]}`;
    } else if (ld > 10 && ld < 20) {
      cld = `${lunarDay[9]}${lunarDay[ld - 11]}`;
    } else if (ld === 20) {
      cld = `${lunarDay[1]}${lunarDay[9]}`;
    } else if (ld > 20 && ld < 30) {
      cld = `${lunarDay[11]}${lunarDay[ld - 21]}`;
    } else if (ld === 30) {
      cld = `${lunarDay[2]}${lunarDay[9]}`;
    }

    // ! 获取农历节日
    let lunar = getLunarFestival(ly, lm, ld);

    // 后面更多返回可调用计算方法输出, 注意调用的时间农历年月日使用格式化中文前的数据
    return {
      code: 200,
      status: true,
      sy: sy, //传入年
      sm: sm, //传入月
      sd: sd, //传入日
      ly: ly, //农历年
      lm: lm, //农历月
      ld: ld, //农历日
      cly: cly, //农历天干地支年
      clm: clm, //农历汉字月
      cld: cld, //农历汉字日
      lunar: lunar, //农历节日
      ZodiacSigns: ZodiacSigns, //农历生肖
    };
  };

  // sloarToLunar("2024-02-09");  // 除夕
  // sloarToLunar("2023-03-22");  // 闰二月初一
  // sloarToLunar("2023-04-20");  // 三月初一
  // sloarToLunar("2023-02-28");  // 二月初九
  // sloarToLunar("2023-01-22");  // 春节
  // sloarToLunar("2020-05-23");  // 闰四月初一
  // sloarToLunar("2020-06-23");  // 五月初三
  // sloarToLunar("2020-01-25");  // 春节
  // sloarToLunar(new Date());

  return sloarToLunar(new Date(`${year}-${month}-${day}`));
};

// ! 获取节气列表
const getSolarTerms = (date: Date) => {
  let year: number = date.getFullYear();
  let month: number = date.getMonth() + 1;
  let day: number = date.getDate();
  // 二十四节气
  let solarTerm = [
    "小寒",
    "大寒",
    "立春",
    "雨水",
    "惊蛰",
    "春分",
    "清明",
    "谷雨",
    "立夏",
    "小满",
    "芒种",
    "夏至",
    "小暑",
    "大暑",
    "立秋",
    "处暑",
    "白露",
    "秋分",
    "寒露",
    "霜降",
    "立冬",
    "小雪",
    "大雪",
    "冬至",
  ];
  let sTermInfo = [
    0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551,
    218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447,
    419210, 440795, 462224, 483532, 504758,
  ];
  let mon = month - 1;
  let solarTerms = "";
  let sotmp1 = new Date(
    31556925974.7 * (year - 1900) +
      sTermInfo[mon * 2 + 1] * 60000 +
      Date.UTC(1900, 0, 6, 2, 5)
  );
  let sotmp2 = sotmp1.getUTCDate(); //根据世界时返回一个月 (UTC) 中的某一天
  if (sotmp2 == day) {
    solarTerms = solarTerm[mon * 2 + 1];
    return solarTerms;
  }
  sotmp1 = new Date(
    31556925974.7 * (year - 1900) +
      sTermInfo[mon * 2] * 60000 +
      Date.UTC(1900, 0, 6, 2, 5)
  );
  sotmp2 = sotmp1.getUTCDate();
  if (sotmp2 == day) {
    solarTerms = solarTerm[mon * 2];
    return solarTerms;
  }
};
