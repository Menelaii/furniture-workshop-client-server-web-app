import {Component, Input} from '@angular/core';
import {Furniture} from "../../../../shared/interfaces/furniture";
import {Utils} from "../../../../shared/services/utils";
import {ModalSelectedIndexProviderService} from "../modal-selected-index-provider.service";

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.sass']
})
export class ExampleModalComponent {
  @Input() furniture: Furniture = this.utils.getMock()

  private _hidden: boolean = true

  constructor(private utils: Utils, public indexProvider: ModalSelectedIndexProviderService) {
  }

  onclose() {
    this.indexProvider.selectedIndex = 0
  }
}
