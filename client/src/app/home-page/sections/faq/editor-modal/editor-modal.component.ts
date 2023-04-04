import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PromoPrice} from "../../../../shared/interfaces/promo-price";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PromoPricesService} from "../../../../shared/services/promo-prices.service";

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.sass']
})
export class EditorModalComponent {
  @Input() selectedItem: PromoPrice = {id: 0, productCode: 'не найдено', price: 0}
  @Output() onSubmitted = new EventEmitter()
  form: FormGroup
  submitted:boolean = false

  constructor(private service: PromoPricesService) {
    this.form = new FormGroup({
      editedValue: new FormControl(null, [
        Validators.required])
    })
  }

  submit() {
    if (this.form.invalid || this.selectedItem == null || this.submitted) {
      return
    }

    this.submitted = true

    this.selectedItem.price = this.form.value.editedValue

    this.service.patch(this.selectedItem).subscribe(r => {
      this.form.reset()
      this.submitted = false
      this.onSubmitted.emit()
    })
  }
}
