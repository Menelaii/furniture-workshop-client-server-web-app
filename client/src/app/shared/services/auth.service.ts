import {Injectable} from "@angular/core";
import {TokenStorageService} from "./token-storage.service";
import {Observable, tap} from "rxjs";
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "../interfaces/auth-response";

@Injectable()
export class AuthService {

  signInUrl:string = "http://localhost:8080/api/auth/sign-in"

  constructor(private storage: TokenStorageService,
              private http: HttpClient) {
  }

  signIn(user:User):Observable<AuthResponse | null> {
    console.log("sending user : " + user.username)
    return this.http.post<AuthResponse>(this.signInUrl, user)
      .pipe(
        tap(this.storage.setToken),
        //catchError(this.handleError.bind(this))
      )
  }

  signOut() {
    this.storage.setToken(null);
  }

  isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }
}
