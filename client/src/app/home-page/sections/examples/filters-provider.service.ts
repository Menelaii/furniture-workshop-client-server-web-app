import {Injectable, OnInit} from '@angular/core';
import {Filters} from "./filters/filters";

@Injectable({
  providedIn: 'root'
})
export class FiltersProviderService {
  filters:Filters = new Filters()
}
