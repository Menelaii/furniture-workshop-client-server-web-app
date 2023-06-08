import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../interfaces/review";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class ReviewsService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  public getAll():Observable<Review[]> {
    return this.http.get<Review[]>(environment.reviewsURL)
  }

  post(newReview: any):Observable<any> {
    return this.http.post(environment.reviewsURL, newReview, {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + this.tokenStorage.getToken() ?? ''
      })
    })
  }

  delete(id: number):Observable<any> {
    return this.http.delete(environment.reviewsURL + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + this.tokenStorage.getToken() ?? ''
      })
    })
  }
}
