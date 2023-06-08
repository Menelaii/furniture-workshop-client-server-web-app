import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PromoPrice} from "../interfaces/promo-price";
import {Injectable} from "@angular/core";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class PromoPricesService {

  constructor(private http: HttpClient,
              private storage: TokenStorageService) {
  }

  getAll() : Observable<PromoPrice[]> {
    return this.http.get<PromoPrice[]>(environment.promoPricesURL);
  }

  patch(promoPrice: PromoPrice): Observable<any> {
    return this.http.patch(environment.promoPricesURL + '/' + promoPrice.id, promoPrice, {
      headers: new HttpHeaders({
        'Authorization' : 'bearer ' + this.storage.getToken() ?? ''
      })
    })
  }
}
