// 随机颜色
export const getRandomColorHEX = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const getRandomColorRGB = () => {
  var color = "rgb(";
  for (var i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 256) + ", ";
  }
  color = color.slice(0, -2) + ")";
  return color;
};
export const getRandomColorHSL = () => {
  var color = "hsl(";
  color += Math.floor(Math.random() * 361) + ", ";
  color += Math.floor(Math.random() * 101) + "%, ";
  color += Math.floor(Math.random() * 101) + "%)";
  return color;
};
