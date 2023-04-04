import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";
import {PromoPricesService} from "./services/promo-prices.service";
import {ReviewsService} from "./services/reviews.service";
import {Utils} from "./services/utils";
import {ThousandsPipe} from "./pipes/thousands.pipe";

@NgModule({
  declarations: [
    ThousandsPipe
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule,
    ThousandsPipe
  ],
  providers: [
    AuthService,
    TokenStorageService,
    PromoPricesService,
    ReviewsService,
    Utils
  ]
})
export class SharedModule {
}
