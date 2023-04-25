import { Component } from '@angular/core';
import {FiltersProviderService} from "../../filters-provider.service";
import {FurnitureTypeService} from "../../../../../shared/services/furniture-type.service";
import {FurnitureType} from "../../../../../shared/interfaces/furniture-type";

@Component({
  selector: 'app-furniture-type',
  templateUrl: './furniture-type.component.html',
  styleUrls: ['./furniture-type.component.sass']
})
export class FurnitureTypeComponent {
  types: FurnitureType[]

   constructor(private furnitureTypeService: FurnitureTypeService,
               public filtersProvider: FiltersProviderService) {
    this.types = furnitureTypeService.getTypes()
   }
}
