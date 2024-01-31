import request from "../../utils/requestUtil";
import { SERVERS } from "../../config/server";
import { API } from "../../config/api";
import {
  authModel,
  authResetModel,
  updateUserModel,
} from "../../models/auth.http.model";

export default class TestHttpServices {
  static async authLogin<T>(params: authModel) {
    return request.get<T>(SERVERS.test.main + "/" + API.login, {
      params,
    });
  }
  static async authRegister<T>(params: authModel) {
    return request.post<T>(SERVERS.test.main + "/" + API.register, {
      params,
    });
  }
  static async authReset<T>(params: authResetModel) {
    return request.post<T>(SERVERS.test.main + "/" + API.reset, {
      params,
    });
  }
  static async authDelete<T>(id: number) {
    return request.post<T>(SERVERS.test.main + "/" + API.delete + "?id=" + id);
  }
  static async getUserList<T>() {
    return request.get<T>(SERVERS.test.main + "/" + API.userList);
  }
  static async getUserById<T>(id: number) {
    return request.get<T>(
      SERVERS.test.main + "/" + API.getUserById + "?id=" + id
    );
  }
  static async updateUser<T>(params: updateUserModel) {
    return request.post<T>(SERVERS.test.main + "/" + API.updateUser, {
      params,
    });
  }
}
