import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FurnitureRich} from "../../../../shared/interfaces/furnitureRich";
import {Utils} from "../../../../shared/services/utils";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.sass']
})
export class ExampleModalComponent {
  @Input() furniture: FurnitureRich = this.utils.getMock()
  @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>()

  isAuthenticated = false

  constructor(private utils: Utils,
              private authService: AuthService) {
    this.isAuthenticated = authService.isAuthenticated()
  }

  onRemoveBtnClick() {
    this.onRemoveClick.emit(this.furniture.id)
  }
}
