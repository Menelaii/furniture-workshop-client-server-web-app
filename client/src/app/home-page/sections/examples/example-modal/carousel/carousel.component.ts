import {Component, Input} from '@angular/core';
import {Image} from "../../../../../shared/interfaces/image";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent {
  @Input() items: Image[] = []
}
