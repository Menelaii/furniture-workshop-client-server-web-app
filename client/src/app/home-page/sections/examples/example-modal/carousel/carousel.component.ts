import {Component, Input} from '@angular/core';
import {Image} from "../../../../../shared/interfaces/image";
import {ModalSelectedIndexProviderService} from "../../modal-selected-index-provider.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent {
  @Input() items: Image[] = []

  constructor(public indexProvider: ModalSelectedIndexProviderService) {
  }

  onNextButtonClick() {
    this.indexProvider.selectedIndex++

    if (this.indexProvider.selectedIndex == this.items.length) {
      this.indexProvider.selectedIndex = 0
    }
  }

  onPreviousButtonClick() {
    this.indexProvider.selectedIndex--

    if (this.indexProvider.selectedIndex < 0) {
      this.indexProvider.selectedIndex = this.items.length - 1
    }
  }
}
