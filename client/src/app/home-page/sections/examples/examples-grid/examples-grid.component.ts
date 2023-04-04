import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Furniture} from "../../../../shared/interfaces/furniture";

@Component({
  selector: 'app-examples-grid',
  templateUrl: './examples-grid.component.html',
  styleUrls: ['./examples-grid.component.sass']
})
export class ExamplesGridComponent {
  @Input() furniture: Furniture[] = []
  @Output() onClick: EventEmitter<Furniture> = new EventEmitter<Furniture>()

  onElementClick(furniture: Furniture) {
    this.onClick.emit(furniture)
  }
}
