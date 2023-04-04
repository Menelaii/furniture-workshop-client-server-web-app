import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Furniture} from "../../../../shared/interfaces/furniture";
import {Utils} from "../../../../shared/services/utils";

@Component({
  selector: 'app-example-template',
  templateUrl: './example-template.component.html',
  styleUrls: ['./example-template.component.sass']
})
export class ExampleTemplateComponent {
  @Input() furniture: Furniture = this.utils.getMock()
  @Output() onClick: EventEmitter<Furniture> = new EventEmitter<Furniture>()

  constructor(private utils:Utils) {
  }

  onContainerClick() {
    this.onClick.emit(this.furniture)
  }
}
