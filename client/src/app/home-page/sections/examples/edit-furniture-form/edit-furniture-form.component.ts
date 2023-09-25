import {Component, EventEmitter, Output} from '@angular/core';
import {FurnitureType} from "../../../../shared/interfaces/furniture-type";
import {FurnitureForm} from "../../../../shared/interfaces/furniture-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FurnitureTypeService} from "../../../../shared/services/furniture-type.service";
import {FurnitureFormService} from "../../../../shared/services/furniture-form.service";
import {FurnitureService} from "../../../../shared/services/furniture.service";
import {Furniture} from "../../../../shared/interfaces/furniture";
import {Utils} from "../../../../shared/services/utils";
import {FurnitureRich} from "../../../../shared/interfaces/furniture-rich";

@Component({
  selector: 'app-edit-furniture-form',
  templateUrl: './edit-furniture-form.component.html',
  styleUrls: ['./edit-furniture-form.component.sass']
})
export class EditFurnitureFormComponent {
  @Output() onSubmitted = new EventEmitter()
  furniture: FurnitureRich  = this.utils.getMock()
  types: FurnitureType[]
  forms: FurnitureForm[]
  form: FormGroup;
  submitted = false
  submitting = false
  message = ''
  success = false

  constructor(private furnitureTypeService: FurnitureTypeService,
              private furnitureFormService: FurnitureFormService,
              private furnitureService: FurnitureService,
              private utils: Utils) {

    this.types = furnitureTypeService.getTypes()
    this.forms = this.furnitureFormService.getForms()

    this.form = new FormGroup({
      title: new FormControl(this.furniture.title, [
        Validators.required]),
      description: new FormControl(this.furniture.description, [
        Validators.required]),
      price: new FormControl(this.furniture.price, [
        Validators.required]),
      form: new FormControl(this.furniture.form, [
        Validators.required, Validators.minLength(2)]),
      priority: new FormControl(this.furniture.priority, [
        Validators.required]),
      length: new FormControl(this.furniture.length, [
        Validators.required]),
      width: new FormControl(this.furniture.width, [
        Validators.required]),
      height: new FormControl(this.furniture.height, [
        Validators.required]),
      diameter: new FormControl(this.furniture.diameter, [
        Validators.required]),
      furnitureType: new FormControl(this.furniture.furnitureType.id, [
        Validators.required, Validators.min(1)])
    })
  }

  submit() {
    if (this.form.invalid || this.submitted || this.furniture.id == undefined) {
      return
    }

    this.submitted = true
    this.submitting = true

    const furniture: Furniture = {...this.form.value}

    furniture.furnitureType = {id: this.form.value.furnitureType}

    const patchObserver = {
      parentEl: this,

      next(value: any) {
        this.parentEl.onSuccessfullySubmitted()
      },
      error(value: any) {
        this.parentEl.resetForm()
        this.parentEl.onSubmitError()
      }
    }

    this.furnitureService
      .patch(this.furniture.id, furniture)
      .subscribe(patchObserver)
  }

  onSuccessfullySubmitted() {
    this.resetForm()
    this.onSubmitted.emit()
    this.message = 'мебель успешно обновлена'
    this.success = true
  }

  onSubmitError() {
    this.resetForm()
    this.message = 'ошибка'
    this.success = false
  }

  resetForm() {
    this.submitted = false
    this.submitting = false
    this.form.reset()
    this.form.patchValue({
      furnitureType: 0,
      form: 0
    })
  }

  resetMessage() {
    this.message = ''
    this.success = false
  }

  setFurniture(furniture: FurnitureRich) {
    this.furniture = furniture

    this.form.patchValue({
      title: this.furniture.title,
      description: this.furniture.description,
      price: this.furniture.price,
      form: this.furniture.form,
      priority: this.furniture.priority,
      length: this.furniture.length,
      width: this.furniture.width,
      height: this.furniture.height,
      diameter: this.furniture.diameter,
      furnitureType: this.furniture.furnitureType.id
    });
  }
}
