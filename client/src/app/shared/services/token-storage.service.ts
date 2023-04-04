import {Injectable} from "@angular/core";
import {AuthResponse} from "../interfaces/auth-response";

@Injectable()
export class TokenStorageService {

  static TOKEN_KEY: string = "jwt"
  static EXP_DATE_KEY: string = "expiresIn"

  getToken():string | null {
    return localStorage.getItem(TokenStorageService.TOKEN_KEY)
  }

  setToken(serverResponse:AuthResponse | null) {
    localStorage.clear()
    if (serverResponse) {
      const expDate = new Date(new Date().getTime() + +serverResponse.expiresIn * 1000)
      localStorage.setItem(TokenStorageService.TOKEN_KEY, serverResponse.token)
      localStorage.setItem(TokenStorageService.EXP_DATE_KEY, expDate.toString())
    }
  }

  isTokenExpired():boolean {
    const expDateStr = localStorage.getItem(TokenStorageService.EXP_DATE_KEY)
    if (expDateStr) {
      const expDate: Date = new Date(expDateStr)
      return new Date() > expDate
    }

    return false
  }
}
