import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Urls} from "./urls";
import {FurniturePage} from "../interfaces/furniture-page";
import {Filters} from "../../home-page/sections/examples/filters/filters";

@Injectable({
  providedIn:'root'
})
export class FurnitureService {

  constructor(private http: HttpClient) {
  }

  getAll(filters:Filters, page: number = 0, size: number = 6) : Observable<FurniturePage> {
    let url = new URL(Urls.FURNITURE)
    url.searchParams.append('page', page.toString())
    url.searchParams.append('itemsPerPage', size.toString())

    if (filters.forms && filters.forms.size > 0) {
      url.searchParams.append('forms', Array.from(filters.forms).toString())
    }

    if (filters.priceMax) url.searchParams.append('priceMax', filters.priceMax.toString())
    if (filters.priceMin) url.searchParams.append('priceMin', filters.priceMin.toString())

    if (filters.furnitureTypeId) url.searchParams.append('furnitureTypeId', filters.furnitureTypeId.toString())

    if (filters.lengthMin) url.searchParams.append('length', filters.lengthMin.toString())
    if (filters.widthMin) url.searchParams.append('width', filters.widthMin.toString())
    if (filters.heightMin) url.searchParams.append('height', filters.heightMin.toString())
    if (filters.diameterMin) url.searchParams.append('diameter', filters.diameterMin.toString())

    return this.http.get<FurniturePage>(url.toString())
  }
}
