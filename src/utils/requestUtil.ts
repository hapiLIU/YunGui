import { message } from "antd";
import { extend } from "umi-request";

const request = extend({
  timeout: 30000,
});

// const CODEMESSAGE = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队(异步任务)。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限(令牌、用户名、密码错误)。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem("token");
  // const headers = token
  //   ? { "yungui-user-token": token, ...options.headers }
  //   : options.headers;
  const headers = options.headers;
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
