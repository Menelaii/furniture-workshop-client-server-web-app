import {Injectable} from "@angular/core";
import {FurnitureType} from "../interfaces/furniture-type";

@Injectable({providedIn:'root'})
export class FurnitureTypeService {
  //todo подгрузка c сервера
  types: FurnitureType[] = [
    {id:1, name: 'Обеденные столы'},
    {id:2, name: 'Барные столы'},
    {id:3, name: 'Столешницы'},
    {id:4, name: 'Тумбы'},
    {id:5, name: 'Прикроватные столики'},
    {id:6, name: 'Журнальные столики'},
    {id:7, name: 'Консоли'},
    {id:8, name: 'Подстолья'}
  ]

  getTypes(): FurnitureType[] {
    return this.types
  }
}
