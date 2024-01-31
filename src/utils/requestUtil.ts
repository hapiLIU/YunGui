import { message } from "antd";
import { extend } from "umi-request";

const request = extend({
  timeout: 30000,
});

request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem("token");
  const headers = token
    ? { "yungui-user-token": token, ...options.headers }
    : options.headers;
  return {
    url: url,
    options: { ...options, headers },
  };
});
request.interceptors.response.use((response) => {
  const status = response.status;
  switch (status) {
    case 200:
    case 201:
    case 206:
    case 204:
      return response;
    case 403:
    case 401:
      message.error(`无权限访问[${status}]`);
      break;
    case 400:
      message.error(`错误请求[${status}]:${JSON.stringify(response.body)}`);
      break;
    case 404:
      message.error(
        `没有找到所请求的资源[${status}:${JSON.stringify(response.body)}]`
      );
      break;
    case 500:
      message.error(
        `请求出错，请联系管理员[${status}:${JSON.stringify(response.body)}]`
      );
      break;
    default:
      message.error(
        `请求出错，请联系管理员[${status}]:${JSON.stringify(response.body)}`
      );
      break;
  }
  return response;
});
export default request;
