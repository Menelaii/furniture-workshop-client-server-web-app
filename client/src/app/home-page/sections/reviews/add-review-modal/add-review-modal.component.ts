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
      stars: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]),
      text: new FormControl(null, [
        Validators.required,
        Validators.maxLength(800)
      ])
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

    const postObserver = {
      parentEl: this,

      next(value: any) {
        this.parentEl.onSuccessfullySubmitted()
      },
      error(value: any) {
        this.parentEl.resetForm()
      }
    }

      this.service.post(newReview).subscribe(postObserver)
  }

  onSuccessfullySubmitted() {
    this.resetForm()
    this.onSubmitted.emit()
  }

  resetForm() {
    this.submitted = false
    this.form.reset()
    this.form.patchValue({
      furnitureType: 0,
      form: 0
    })
  }
}
