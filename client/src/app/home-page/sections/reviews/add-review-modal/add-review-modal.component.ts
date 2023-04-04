import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewsService} from "../../../../shared/services/reviews.service";

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './add-review-modal.component.html',
  styleUrls: ['./add-review-modal.component.sass']
})
export class AddReviewModalComponent {
  @Output() onSubmitted = new EventEmitter()
  form: FormGroup
  submitted:boolean = false

  constructor(private service: ReviewsService) {
    this.form = new FormGroup({
      reviewer: new FormControl(null, [Validators.required]),
      stars: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    if (this.form.invalid || this.submitted) {
      return
    }

    this.submitted = true

    const newReview = {
      reviewer: this.form.value.reviewer,
      text: this.form.value.text,
      stars: this.form.value.stars
    }

    this.service.post(newReview).subscribe(r => {
      this.form.reset()
      this.submitted = false
      this.onSubmitted.emit()
      console.log('response ' + r)
    })
  }
}
