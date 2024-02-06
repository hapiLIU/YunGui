import request from "../../utils/requestUtil";
import { SERVERS } from "../../config/server";
import { API } from "../../config/api";
import {
  authModel,
  authResetModel,
  updateUserModel,
} from "@models/auth.http.model";

export default class AuthHttpServices {
  // 登录
  static async authLogin<T>(params: authModel) {
    console.log(params);
    return request.get<T>(SERVERS.test.main + "/" + API.login, {
      params,
    });
  }
  // 注册
  static async authRegister<T>(params: authModel) {
    return request.post<T>(SERVERS.test.main + "/" + API.register, {
      params,
    });
  }
  // 重置密码
  static async authReset<T>(params: authResetModel) {
    return request.post<T>(SERVERS.test.main + "/" + API.reset, {
      params,
    });
  }
  // 删除用户
  static async authDelete<T>(id: number) {
    return request.post<T>(SERVERS.test.main + "/" + API.delete, {
      params: {
        id,
      },
    });
  }
  // 获取用户列表
  static async getUserList<T>() {
    return request.get<T>(SERVERS.test.main + "/" + API.userList);
  }
  // 根据ID查询用户
  static async getUserById<T>(id: number) {
    return request.get<T>(
      SERVERS.test.main + "/" + API.getUserById + "?id=" + id
    );
  }
  // 根据ID查询用户
  static async getUserByUserId<T>(user_id: number) {
    return request.get<T>(
      SERVERS.test.main + "/" + API.getUserByUserId + "?user_id=" + user_id
    );
  }
  // 更新用户信息
  static async updateUser<T>(params: updateUserModel) {
    return request.post<T>(SERVERS.test.main + "/" + API.updateUser, {
      params,
    });
  }
}
