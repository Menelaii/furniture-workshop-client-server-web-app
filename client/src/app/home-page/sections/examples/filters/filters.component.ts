import {Component} from '@angular/core';
import {FiltersProviderService} from "../filters-provider.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent {
  constructor(private filtersProvider: FiltersProviderService) {
  }

  onClearFiltersClick() {
    this.filtersProvider.filters.setDefaults()
  }
}
