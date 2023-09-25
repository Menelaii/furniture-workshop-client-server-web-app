import {Component, EventEmitter, Output} from '@angular/core';
import {ImagesService} from "../../../../shared/services/images.service";
import {FurnitureRich} from "../../../../shared/interfaces/furniture-rich";
import {FurnitureService} from "../../../../shared/services/furniture.service";
import {Utils} from "../../../../shared/services/utils";
import {Image} from "../../../../shared/interfaces/image";
import {Action} from './action';

@Component({
  selector: 'app-edit-images-form',
  templateUrl: './edit-images-form.component.html',
  styleUrls: ['./edit-images-form.component.sass']
})
export class EditImagesFormComponent {
  @Output() onSubmitted = new EventEmitter()
  furniture: FurnitureRich = this.utils.getMock()
  submitted = false
  submitting = false
  action: Action = Action.NONE



  constructor(private imagesService: ImagesService,
              private furnitureService: FurnitureService,
              private utils: Utils) {
  }

  onRadioChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.checked) {
      return
    }

    const actionValue = parseInt(target.value);
    if (!isNaN(actionValue)) {
      this.action = actionValue as Action;
    }
  }

  onImageClick(image: Image) {
    if (this.furniture.id == undefined || image.id === -1
      || this.submitted || this.action === Action.NONE) {
      return
    }

    this.submitted = true
    this.submitting = true

    const observer = {
      parentEl: this,

      next(value: any) {
        this.parentEl.onSuccessfullySubmitted()
      },
      error(value: any) {
        this.parentEl.resetForm()
        this.parentEl.onSubmitError()
      }
    }

    switch (this.action) {
      case Action.DELETE:
        this.imagesService.delete(image.id)
          .subscribe(observer)
        image.id = -1
        image.link = 'assets/images/no-preview.svg'
        break

      case Action.SET_AS_PREVIEW:
        this.furnitureService.changePreview(this.furniture.id, image.id)
          .subscribe(observer)
        break
    }
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
  }

  setFurniture(furniture: FurnitureRich) {
    this.furniture = furniture
  }
}
