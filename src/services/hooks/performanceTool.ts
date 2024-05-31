// 防抖
export const debounce = (fn: any, delay: number) => {
  let timer: any = null;
  const _debounce = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, delay);
  };
  return _debounce;
};

// 节流
export const throttle = (fn: any, interval: number) => {
  let startTime = 0;
  const _throttle = () => {
    const nowTime = new Date().getTime();
    const waitTime = interval - (nowTime - startTime);
    if (waitTime <= 0) {
      fn();
      startTime = nowTime;
    }
  };
  return _throttle;
};
