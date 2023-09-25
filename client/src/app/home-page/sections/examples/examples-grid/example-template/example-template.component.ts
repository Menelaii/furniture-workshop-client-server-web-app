import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FurnitureRich} from "../../../../../shared/interfaces/furniture-rich";
import {Utils} from "../../../../../shared/services/utils";

@Component({
  selector: 'app-example-template',
  templateUrl: './example-template.component.html',
  styleUrls: ['./example-template.component.sass']
})
export class ExampleTemplateComponent {
  @Input() furniture: FurnitureRich = this.utils.getMock()
  @Output() onClick: EventEmitter<FurnitureRich> = new EventEmitter<FurnitureRich>()

  constructor(private utils:Utils) {
  }

  onContainerClick() {
    this.onClick.emit(this.furniture)
  }
}
