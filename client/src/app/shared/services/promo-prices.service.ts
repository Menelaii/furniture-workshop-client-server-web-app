import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PromoPrice} from "../interfaces/promo-price";
import {Injectable} from "@angular/core";
import {Urls} from "./urls";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class PromoPricesService {

  constructor(private http: HttpClient,
              private storage: TokenStorageService) {
  }

  getAll() : Observable<PromoPrice[]> {
    return this.http.get<PromoPrice[]>(Urls.PROMO_PRICES);
  }

  patch(promoPrice: PromoPrice): Observable<any> {
    return this.http.patch(Urls.PROMO_PRICES + '/' + promoPrice.id, promoPrice, {
      headers: new HttpHeaders({
        'Authorization' : 'bearer ' + this.storage.getToken() ?? ''
      })
    })
  }
}
