import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FurnitureTemplateComponent } from './shared/components/furniture-template/furniture-template.component';
import {SharedModule} from "./shared/shared.module";
import { ReviewsComponent } from './home-page/sections/reviews/reviews.component';
import { HeaderComponent } from './home-page/sections/header/header.component';
import { FooterComponent } from './home-page/sections/footer/footer.component';
import { AboutComponent } from './home-page/sections/about/about.component';
import { ReviewTemplateComponent } from './home-page/sections/reviews/review-template/review-template.component';
import { FaqComponent } from './home-page/sections/faq/faq.component';
import { ExamplesComponent } from './home-page/sections/examples/examples.component';
import { ExampleTemplateComponent } from './home-page/sections/examples/examples-grid/example-template/example-template.component';
import { PagesComponent } from './home-page/sections/examples/pages/pages.component';
import { ExampleModalComponent } from './home-page/sections/examples/example-modal/example-modal.component';
import { FiltersComponent } from './home-page/sections/examples/filters/filters.component';
import { FurnitureTypeComponent } from './home-page/sections/examples/filters/furniture-type/furniture-type.component';
import { PriceComponent } from './home-page/sections/examples/filters/price/price.component';
import { CarouselComponent } from './home-page/sections/examples/example-modal/carousel/carousel.component';
import {FurnitureFormComponent} from "./home-page/sections/examples/filters/furniture-form/furniture-form.component";
import { FurnitureSizeComponent } from './home-page/sections/examples/filters/furniture-size/furniture-size.component';
import { ExamplesGridComponent } from './home-page/sections/examples/examples-grid/examples-grid.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditorModalComponent } from './home-page/sections/faq/editor-modal/editor-modal.component';
import {AddReviewModalComponent} from "./home-page/sections/reviews/add-review-modal/add-review-modal.component";
import { RemovableReviewTemplateComponent } from './home-page/sections/reviews/removable-review-template/removable-review-template.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import { AddFurnitureFormComponent } from './home-page/sections/examples/add-furniture-form/add-furniture-form.component';
import {AuthGuard} from "./shared/services/auth.guard";

@NgModule({
    declarations: [
        AppComponent,
        MainLayoutComponent,
        HomePageComponent,
        FurnitureTemplateComponent,
        ReviewsComponent,
        HeaderComponent,
        FooterComponent,
        AboutComponent,
        ReviewTemplateComponent,
        FaqComponent,
        ExamplesComponent,
        ExampleTemplateComponent,
        PagesComponent,
        ExampleModalComponent,
        FiltersComponent,
        FurnitureTypeComponent,
        PriceComponent,
        CarouselComponent,
        FurnitureFormComponent,
        FurnitureFormComponent,
        FurnitureSizeComponent,
        ExamplesGridComponent,
        EditorModalComponent,
        AddReviewModalComponent,
        AddReviewModalComponent,
        RemovableReviewTemplateComponent,
        LoginPageComponent,
        AddFurnitureFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [ReviewsComponent, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
