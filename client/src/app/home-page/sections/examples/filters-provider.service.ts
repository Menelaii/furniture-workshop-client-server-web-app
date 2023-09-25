import {Injectable, OnInit} from '@angular/core';
import {Filters} from "./filters/filters";
import {FurnitureFormService} from "../../../shared/services/furniture-form.service";

@Injectable({
  providedIn: 'root'
})
export class FiltersProviderService {
  filters:Filters

  constructor(private formService: FurnitureFormService) {
    this.filters = new Filters(formService.getNamesSet())
  }
}
