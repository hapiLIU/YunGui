import UserService from "./user.service";
import TokenService from "./token.service";

export default class AuthService {
  // 是否登录
  isLoggedIn(): boolean {
    const user = UserService.getUser();
    const token = TokenService.getToken();
    return !!(user && user.userId && token && token.token);
    // return true;
  }
  //   登出
  logout() {
    UserService.clear();
    TokenService.clear();
  }
}
