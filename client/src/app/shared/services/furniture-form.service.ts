import {Injectable} from "@angular/core";
import {FurnitureForm} from "../interfaces/furniture-form";

@Injectable({providedIn:'root'})
export class FurnitureFormService {
  //todo подгрузка c сервера
  forms: FurnitureForm[] = [
    {internalName:"Прямоугольная", name: 'Прямоугольная'},
    {internalName:"Круглая", name: 'Круглая'},
    {internalName:"Овальная", name: 'Овальная'},
    {internalName:"Полуовальная", name: 'Полуовальная'}
  ]

  getForms(): FurnitureForm[] {
    return this.forms
  }

  getNamesSet():Set<string> {
    return new Set<string>(
      this.forms.map(el => el.name)
    )
  }
}
