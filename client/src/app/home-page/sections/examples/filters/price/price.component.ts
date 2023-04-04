import { Component } from '@angular/core';
import {FiltersProviderService} from "../../filters-provider.service";

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent {
  constructor(public filtersProvider: FiltersProviderService) {
  }
}
