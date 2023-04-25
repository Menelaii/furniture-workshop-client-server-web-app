import {Component, EventEmitter, Output} from '@angular/core';
import {FurnitureType} from "../../../../shared/interfaces/furniture-type";
import {FurnitureForm} from "../../../../shared/interfaces/furniture-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FurnitureTypeService} from "../../../../shared/services/furniture-type.service";
import {FurnitureFormService} from "../../../../shared/services/furniture-form.service";
import {FurnitureService} from "../../../../shared/services/furniture.service";
import {Furniture} from "../../../../shared/interfaces/furniture";

@Component({
  selector: 'app-add-furniture-form',
  templateUrl: './add-furniture-form.component.html',
  styleUrls: ['./add-furniture-form.component.sass']
})
export class AddFurnitureFormComponent {
  @Output() onSubmitted = new EventEmitter()
  types: FurnitureType[]
  forms: FurnitureForm[]
  form: FormGroup;
  submitted = false

  constructor(private furnitureTypeService: FurnitureTypeService,
              private furnitureFormService: FurnitureFormService,
              private furnitureService: FurnitureService) {

    this.types = furnitureTypeService.getTypes()
    this.forms = this.furnitureFormService.getForms()

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required]),
      description: new FormControl(null, [
        Validators.required]),
      price: new FormControl(null, [
        Validators.required]),
      form: new FormControl(0, [
        Validators.required, Validators.minLength(2)]),
      priority: new FormControl(null, [
        Validators.required]),
      length: new FormControl(null, [
        Validators.required]),
      width: new FormControl(null, [
        Validators.required]),
      height: new FormControl(null, [
        Validators.required]),
      diameter: new FormControl(null, [
        Validators.required]),
      furnitureType: new FormControl(0, [
        Validators.required, Validators.min(1)]),
      imageFiles: new FormControl(null, Validators.required)
    })
  }

  handleFileInput(eventTarget: EventTarget | null) {
    if (eventTarget == null) {
      return
    }

    let files: FileList | null = (eventTarget as HTMLInputElement).files
    this.form.controls['imageFiles'].setValue(files ? files :  '')
  }

  submit() {
    if (this.form.invalid || this.submitted) {
      return
    }

    this.submitted = true

    const furniture: Furniture = {...this.form.value}

    furniture.furnitureType = {id: this.form.value.furnitureType}

    let formData = new FormData()


    formData.append('furniture', new Blob([JSON.stringify(furniture)], {
      type: 'application/json',
    }))

    Array.prototype.forEach.call(this.form.value.imageFiles, file => {
      formData.append("images", file, file.name)
    });

    const postObserver = {
      parentEl: this,

      next(value: any) {
        this.parentEl.onSuccessfullySubmitted()
      },
      error(value: any) {
        this.parentEl.resetForm()
      }
    }

    this.furnitureService.post(formData).subscribe(postObserver)
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
