import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FurnitureRich} from "../../../../../shared/interfaces/furnitureRich";
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
    //data-bs-toggle="modal" data-bs-target="#exampleModal" todo delete
    this.onClick.emit(this.furniture)
  }
}
