import {Component, Input, OnChanges} from '@angular/core';
import {Image} from "../../../../../shared/interfaces/image";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent { //implements OnChanges
  @Input() items: Image[] = []

  // ngOnChanges(): void {
  //   console.log('onchages')
  //   this.items.sort((i) => i.isThumbnail)
  // }
}
