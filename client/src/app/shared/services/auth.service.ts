import {Injectable} from "@angular/core";
import {TokenStorageService} from "./token-storage.service";
import {Observable, tap} from "rxjs";
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "../interfaces/auth-response";
import {environment} from "../../../environments/environment";

@Injectable()
export class AuthService {

  constructor(private storage: TokenStorageService,
              private http: HttpClient) {
  }

  signIn(user:User):Observable<AuthResponse | null> {
    return this.http.post<AuthResponse>(environment.signInUrl, user)
      .pipe(
        tap(this.storage.setToken),
        //catchError(this.handleError.bind(this)) todo
      )
  }

  signOut() {
    this.storage.setToken(null);
  }

  isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }
}
