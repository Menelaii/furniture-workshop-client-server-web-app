import {Component, OnInit} from '@angular/core';
import {PromoPricesService} from "../../../shared/services/promo-prices.service";
import {PromoPrice} from "../../../shared/interfaces/promo-price";
import {FiltersProviderService} from "../examples/filters-provider.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {
  loading = false
  consoles = 12500
  pedestals = 20000
  coffeeTables = 9000
  bedsideTables = 7500
  rectangularDiningTables120x60 = 15000
  rectangularDiningTables150x75 = 25000
  rectangularDiningTables160x80 = 26000
  roundDiningTablesDiameter80 = 25000
  roundDiningTablesDiameter100 = 30000
  roundDiningTablesDiameter110_120 = 38000
  roundDiningTablesDiameter130_150 = 85000
  paintingInGoldOrChrome = 1500
  closedCornerMin = 3
  closedCornerMax = 10
  isAuthenticated:boolean = false
  selectedItem: PromoPrice = this.defaultSelected()
  editorMap = new Map<string, PromoPrice>()

  constructor(private service: PromoPricesService,
              public filtersProvider: FiltersProviderService,
              private authService:AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated()
    this.fetchPrices()
  }

  fetchPrices() {
    this.loading = true
    this.service.getAll().subscribe(r => {
      this.initializeFields(r)
      this.loading = false
    })
  }

  initializeFields(prices: PromoPrice[]): void {
    let map: Map<string, number> =
      new Map<string, number>(prices.map(i => [i.productCode, i.price]))

    this.consoles = map.get("консоль") ?? this.consoles;
    this.pedestals = map.get("тумба") ?? this.pedestals;
    this.coffeeTables = map.get("журнальный_столик") ?? this.coffeeTables;
    this.bedsideTables = map.get("прикроватный_столик") ?? this.bedsideTables;
    this.rectangularDiningTables120x60 = map.get("обеденный_прямоугольный_стол120x60") ?? this.rectangularDiningTables120x60;
    this.rectangularDiningTables150x75 = map.get("обеденный_прямоугольный_стол150x75") ?? this.rectangularDiningTables150x75;
    this.rectangularDiningTables160x80 = map.get("обеденный_прямоугольный_стол160x80") ?? this.rectangularDiningTables160x80;
    this.roundDiningTablesDiameter80 = map.get("обеденный_круглый_стол_диаметр80") ?? this.roundDiningTablesDiameter80;
    this.roundDiningTablesDiameter100 = map.get("обеденный_круглый_стол_диаметр100") ?? this.roundDiningTablesDiameter100;
    this.roundDiningTablesDiameter110_120 = map.get("обеденный_круглый_стол_диаметр110_120") ?? this.roundDiningTablesDiameter110_120;
    this.roundDiningTablesDiameter130_150 = map.get('обеденный_круглый_стол_диаметр130_150') ?? this.roundDiningTablesDiameter130_150;
    this.paintingInGoldOrChrome = map.get("покраска_золото_хром") ?? this.paintingInGoldOrChrome;
    this.closedCornerMin = map.get("закрытый_край_минимум") ?? this.closedCornerMin;
    this.closedCornerMax = map.get("закрытый_край_максимум") ?? this.closedCornerMax;


    if (!this.isAuthenticated) {
      return;
    }

    if (this.editorMap.size != 0) {
      this.editorMap.clear()
    }

    prices.forEach(value => {
      this.editorMap.set(value.productCode, value)
    })
  }

  onEditButtonClick(code: string) {
    this.selectedItem = this.editorMap.get(code) ?? this.defaultSelected()
  }

  defaultSelected() {
    return {id: 0, productCode: 'не найдено', price: 0}
  }
}
