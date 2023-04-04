import {Component, EventEmitter, Output} from '@angular/core';
import {ReviewTemplateComponent} from "../review-template/review-template.component";

@Component({
  selector: 'app-removable-review-template',
  templateUrl: './removable-review-template.component.html',
  styleUrls: ['./removable-review-template.component.sass']
})
export class RemovableReviewTemplateComponent extends ReviewTemplateComponent {
  @Output() onRemoveButtonClick = new EventEmitter<number>()

  onRemoveBtnClick() {
    this.onRemoveButtonClick.emit(this.id)
  }
}
