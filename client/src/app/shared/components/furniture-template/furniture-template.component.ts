import {Component, Input} from '@angular/core';
import {Furniture} from "../../interfaces/furniture";
import {Utils} from "../../services/utils";

@Component({
  selector: 'app-furniture-template',
  templateUrl: './furniture-template.component.html',
  styleUrls: ['./furniture-template.component.sass']
})
export class FurnitureTemplateComponent {
  @Input() furniture: Furniture = this.utils.getMock()

  constructor(private utils:Utils) {
  }
}
