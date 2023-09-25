import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FurnitureRich} from "../../../../shared/interfaces/furniture-rich";
import {Furniture} from "../../../../shared/interfaces/furniture";

@Component({
  selector: 'app-examples-grid',
  templateUrl: './examples-grid.component.html',
  styleUrls: ['./examples-grid.component.sass']
})
export class ExamplesGridComponent {
  @Input() furniture: FurnitureRich[] = []
  @Output() onClick: EventEmitter<FurnitureRich> = new EventEmitter<FurnitureRich>()

  onElementClick(furniture: FurnitureRich) {
    this.onClick.emit(furniture)
  }
}
