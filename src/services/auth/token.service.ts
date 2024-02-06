export interface IToken {
  token: string;
}

export default class TokenService {
  static LOCALSTORAGE_KEY = "token";
  static setToken(token: IToken) {
    localStorage.setItem(this.LOCALSTORAGE_KEY, JSON.stringify(token));
  }
  static getToken(): IToken {
    return JSON.parse(localStorage.getItem(this.LOCALSTORAGE_KEY) || "");
  }
  static clear() {
    localStorage.removeItem(this.LOCALSTORAGE_KEY);
  }
}
