import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImagesService} from "../../../../shared/services/images.service";

@Component({
  selector: 'app-add-image-form',
  templateUrl: './add-image-form.component.html',
  styleUrls: ['./add-image-form.component.sass']
})
export class AddImageFormComponent {
  @ViewChild('visibleImageInput') visibleFileInput!: ElementRef<HTMLInputElement>
  @Output() onSubmitted = new EventEmitter()
  furnitureId: number = 0
  form: FormGroup;
  submitted = false
  submitting = false

  constructor(private imagesService: ImagesService) {
    this.form = new FormGroup({
      isThumbnail: new FormControl(false),
      file: new FormControl(null, Validators.required)
    })
  }

  handleFileInput(eventTarget: EventTarget | null) {
    const element = (eventTarget as HTMLInputElement)
    if (element && element.files) {
      let file: File | null = element.files.item(0)
      this.form.controls['file'].setValue(file ? file :  '')
    }
  }

  submit() {
    if (this.form.invalid || this.submitted) {
      return
    }

    this.submitted = true
    this.submitting = true

    const formData = new FormData()
    formData.append('file', this.form.value.file, this.form.value.file.name)

    const postObserver = {
      parentEl: this,

      next(value: any) {
        this.parentEl.onSuccessfullySubmitted()
      },
      error(value: any) {
        this.parentEl.resetForm()
        this.parentEl.onSubmitError()
      }
    }

    this.imagesService.post(this.furnitureId,
      this.form.value.isThumbnail, formData).subscribe(postObserver)
  }

  onSuccessfullySubmitted() {
    this.resetForm()
    this.onSubmitted.emit()
  }

  onSubmitError() {
    this.resetForm()
  }

  resetForm() {
    this.submitted = false
    this.submitting = false
    this.form.reset()
    this.visibleFileInput.nativeElement.value = ''
  }

  setFurnitureId(id: number) {
    this.furnitureId = id
  }
}
