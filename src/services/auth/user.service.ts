export default class UserService {
  static LOCALSTORAGE_KEY = "user";
  static setUser(user: any) {
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(user));
  }
  static getUser(): any {
    return JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY) || "");
  }
  static clear() {
    localStorage.removeItem(this.LOCALSTORAGE_KEY);
  }
}
