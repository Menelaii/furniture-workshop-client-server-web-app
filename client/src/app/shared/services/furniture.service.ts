import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FurniturePage} from "../interfaces/furniture-page";
import {Filters} from "../../home-page/sections/examples/filters/filters";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn:'root'
})
export class FurnitureService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) {
  }

  getAll(filters:Filters, page: number = 0, size: number = 6) : Observable<FurniturePage> {
    let url = new URL(environment.furnitureURL)
    url.searchParams.append('page', page.toString())
    url.searchParams.append('itemsPerPage', size.toString())

    if (filters.forms && filters.forms.size > 0) {
      url.searchParams.append('forms', Array.from(filters.forms).toString())
    }

    if (filters.priceMax) url.searchParams.append('priceMax', filters.priceMax.toString())
    if (filters.priceMin) url.searchParams.append('priceMin', filters.priceMin.toString())

    if (filters.furnitureTypeId) url.searchParams.append('furnitureTypeId', filters.furnitureTypeId.toString())

    if (filters.lengthMin) url.searchParams.append('lengthMin', filters.lengthMin.toString())
    if (filters.widthMin) url.searchParams.append('widthMin', filters.widthMin.toString())
    if (filters.heightMin) url.searchParams.append('heightMin', filters.heightMin.toString())
    if (filters.diameterMin) url.searchParams.append('diameterMin', filters.diameterMin.toString())

    if (filters.lengthMax) url.searchParams.append('lengthMax', filters.lengthMax.toString())
    if (filters.widthMax) url.searchParams.append('widthMax', filters.widthMax.toString())
    if (filters.heightMax) url.searchParams.append('heightMax', filters.heightMax.toString())
    if (filters.diameterMax) url.searchParams.append('diameterMax', filters.diameterMax.toString())

    return this.http.get<FurniturePage>(url.toString())
  }

  delete(id: number):Observable<any> {
    return this.http.delete(environment.furnitureURL + '/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + this.tokenStorage.getToken() ?? ''
      })
    })
  }

  post(formData: FormData):Observable<any> {
    return this.http.post(environment.furnitureURL, formData,{
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + this.tokenStorage.getToken() ?? ''})
    })
  }
}
