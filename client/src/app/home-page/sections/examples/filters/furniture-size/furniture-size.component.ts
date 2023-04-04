import { Component } from '@angular/core';
import {FiltersProviderService} from "../../filters-provider.service";

@Component({
  selector: 'app-furniture-size',
  templateUrl: './furniture-size.component.html',
  styleUrls: ['./furniture-size.component.sass']
})
export class FurnitureSizeComponent {
  constructor(public filtersProvider: FiltersProviderService) {
  }
}
