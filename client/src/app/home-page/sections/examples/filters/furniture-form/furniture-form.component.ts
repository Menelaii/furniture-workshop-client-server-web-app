import {Component} from '@angular/core';
import {FiltersProviderService} from "../../filters-provider.service";
import {FurnitureFormService} from "../../../../../shared/services/furniture-form.service";
import {FurnitureForm} from "../../../../../shared/interfaces/furniture-form";

@Component({
  selector: 'app-furniture-form',
  templateUrl: './furniture-form.component.html',
  styleUrls: ['./furniture-form.component.sass']
})
export class FurnitureFormComponent {
  forms: FurnitureForm[]

  constructor(public filtersProvider: FiltersProviderService,
              private furnitureFormService: FurnitureFormService) {
    this.forms = this.furnitureFormService.getForms()
  }

  onChange($event:any) {
    let form = $event.target.value
    let isChecked = $event.target.checked

    if (isChecked) {
      this.filtersProvider.filters.addForm(form)
    } else {
      this.filtersProvider.filters.removeForm(form)
    }
  }

  hasForm(name: string): boolean {
    return this.filtersProvider.filters.forms != null
      && this.filtersProvider.filters.forms?.has(name)
  }
}
