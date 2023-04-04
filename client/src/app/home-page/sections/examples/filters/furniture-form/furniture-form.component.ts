import {Component, OnChanges} from '@angular/core';
import {FiltersProviderService} from "../../filters-provider.service";

@Component({
  selector: 'app-furniture-form',
  templateUrl: './furniture-form.component.html',
  styleUrls: ['./furniture-form.component.sass']
})
export class FurnitureFormComponent {

  constructor(public filtersProvider: FiltersProviderService) {
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
