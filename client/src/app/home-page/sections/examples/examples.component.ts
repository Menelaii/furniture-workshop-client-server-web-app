import {Component, OnDestroy, OnInit} from '@angular/core';
import {Furniture} from "../../../shared/interfaces/furniture";
import {FurnitureService} from "../../../shared/services/furniture.service";
import {Utils} from "../../../shared/services/utils";
import {Filters} from "./filters/filters";
import {FiltersProviderService} from "./filters-provider.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.sass']
})
export class ExamplesComponent implements OnInit, OnDestroy {
  furniture: Furniture[] = []
  loading = false
  totalPages = 1
  currentPage = 1
  selected: Furniture = this.utils.getMock()
  timeout:NodeJS.Timeout | undefined
  subscription: Subscription

  constructor(private service: FurnitureService,
              private utils: Utils,
              private filtersProvider: FiltersProviderService) {
    this.subscription = this.filtersProvider.filters
      .onChanged.subscribe((value => {
        if (this.timeout != null) {
          clearTimeout(this.timeout)
        }

        this.timeout =
          setTimeout(() => this.onFiltersChanged(value.filters), value.timeout)
    }))
  }

  ngOnInit(): void {
    this.fetchExamples(this.filtersProvider.filters, this.currentPage)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  fetchExamples(filters:Filters, page:number = 1) {
    --page
    this.loading = true
    this.service.getAll(filters, page).subscribe(
      r => {
        this.furniture = r.furniture
        this.totalPages = r.totalPages
        this.loading = false
      })
  }

  onPageButtonClick(page: number) {
    this.currentPage = page
    this.fetchExamples(this.filtersProvider.filters, this.currentPage)
  }

  onTemplateClick(furniture: Furniture) {
    this.selected = furniture
  }

  onFiltersChanged(filters: Filters) {
    this.currentPage = 1
    this.fetchExamples(filters)
  }
}
