import { Component } from '@angular/core';
import {FiltersProviderService} from "../../filters-provider.service";

interface FurnitureType {
  id: number
  name: string
}

@Component({
  selector: 'app-furniture-type',
  templateUrl: './furniture-type.component.html',
  styleUrls: ['./furniture-type.component.sass']
})
export class FurnitureTypeComponent {
  //todo подгрузка энамов
  types: FurnitureType[] = [
    {id:1, name: 'Обеденные столы'},
    {id:2, name: 'Барные столы'},
    {id:3, name: 'Столешницы'},
    {id:4, name: 'Тумбы'},
    {id:5, name: 'Прикроватные столики'},
    {id:6, name: 'Журнальные столики'},
    {id:7, name: 'Консоли'}
  ]

   constructor(public filtersProvider: FiltersProviderService) {
   }
}
