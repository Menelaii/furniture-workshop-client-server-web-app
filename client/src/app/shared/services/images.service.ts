import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn:'root'
})
export class ImagesService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.imagesUrl}/${id}`, {
      headers : new HttpHeaders({
          'Authorization' : 'bearer ' + this.tokenStorage.getToken() ?? ''})
    })
  }

  post(furnitureId: number, isThumbnail: boolean, formData: FormData): Observable<any> {
    return this.http.post(
      `${environment.furnitureURL}/${furnitureId}/images?isThumbnail=${isThumbnail}`,
      formData, { headers : new HttpHeaders({
        'Authorization' : 'bearer ' + this.tokenStorage.getToken() ?? ''})
    })
  }
}
