import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FurnitureRich} from "../../../shared/interfaces/furniture-rich";
import {FurnitureService} from "../../../shared/services/furniture.service";
import {Utils} from "../../../shared/services/utils";
import {Filters} from "./filters/filters";
import {FiltersProviderService} from "./filters-provider.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";
import {AddFurnitureFormComponent} from "./add-furniture-form/add-furniture-form.component";

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.sass']
})
export class ExamplesComponent implements OnInit, OnDestroy {
  @ViewChild(AddFurnitureFormComponent) addFormComponent! : AddFurnitureFormComponent
  furniture: FurnitureRich[] = []
  loading = false
  totalPages = 1
  currentPage = 1
  selected: FurnitureRich = this.utils.getMock()
  timeout:NodeJS.Timeout | undefined
  subscription: Subscription
  isAuthenticated = false

  constructor(private service: FurnitureService,
              private utils: Utils,
              private filtersProvider: FiltersProviderService,
              private authService: AuthService) {
    this.isAuthenticated = authService.isAuthenticated()

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
    this.fetchExamples(this.currentPage)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  fetchExamples(page:number = 1,
                filters:Filters = this.filtersProvider.filters,
                onLoad: Function = function () {}) {
    --page
    this.loading = true
    this.service.getAll(filters, page).subscribe(
      r => {
        this.furniture = r.furniture
        this.totalPages = r.totalPages
        this.loading = false
        onLoad.call(this)
      })
  }

  onPageButtonClick(page: number) {
    this.currentPage = page
    this.fetchExamples(this.currentPage)
  }

  onTemplateClick(furniture: FurnitureRich) {
    this.selected = furniture
  }

  onFiltersChanged(filters: Filters) {
    this.currentPage = 1
    this.fetchExamples(this.currentPage, filters)
  }

  onRemoveButtonClick(id: number) {
    this.service.delete(id).subscribe(r => {
      this.fetchExamples(this.currentPage)
    })
  }

  onShowAddFormClick() {
    this.addFormComponent.resetMessage()
  }

  onEditSubmitted() {
    this.fetchExamples(this.currentPage,
      this.filtersProvider.filters,
      this.tryUpdateSelected)
  }

  tryUpdateSelected() {
    this.selected =
      this.furniture.find(f => f.id == this.selected.id)
      ?? this.selected
  }
}
