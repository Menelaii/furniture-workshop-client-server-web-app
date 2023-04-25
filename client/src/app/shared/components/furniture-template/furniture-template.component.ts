import {Component, Input} from '@angular/core';
import {FurnitureRich} from "../../interfaces/furnitureRich";
import {Utils} from "../../services/utils";

@Component({
  selector: 'app-furniture-template',
  templateUrl: './furniture-template.component.html',
  styleUrls: ['./furniture-template.component.sass']
})
export class FurnitureTemplateComponent {
  @Input() furniture: FurnitureRich = this.utils.getMock()

  constructor(private utils:Utils) {
  }
}
