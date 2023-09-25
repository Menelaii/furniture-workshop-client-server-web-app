import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FurnitureRich} from "../../../../shared/interfaces/furniture-rich";
import {Utils} from "../../../../shared/services/utils";
import {AuthService} from "../../../../shared/services/auth.service";
import {EditFurnitureFormComponent} from "../edit-furniture-form/edit-furniture-form.component";
import {AddImageFormComponent} from "../add-image-form/add-image-form.component";
import {EditImagesFormComponent} from "../edit-images-form/edit-images-form.component";

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.sass']
})
export class ExampleModalComponent {
  @ViewChild('editFurnitureForm') editForm: EditFurnitureFormComponent | null = null
  @ViewChild('addImageForm') addImageForm: AddImageFormComponent | null = null
  @ViewChild('editImagesForm') editImagesForm: EditImagesFormComponent | null = null
  @Input() furniture: FurnitureRich = this.utils.getMock()
  @Output() onRemoveClick: EventEmitter<number> = new EventEmitter<number>()
  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>()

  isAuthenticated = false

  constructor(private utils: Utils,
              private authService: AuthService) {
    this.isAuthenticated = authService.isAuthenticated()
  }

  onRemoveBtnClick() {
    this.onRemoveClick.emit(this.furniture.id)
  }

  onEditBtnClick() {
    if (this.editForm) {
      this.editForm.resetMessage()
      this.editForm.setFurniture(this.furniture)
    }
  }

  onEditSubmitted() {
    this.onEdit.emit()
  }

  onAddImageBtnClick() {
    if (this.addImageForm && this.furniture.id) {
      this.addImageForm.setFurnitureId(this.furniture.id)
    }
  }

  onEditImagesBtnClick() {
    if (this.editImagesForm) {
      this.editImagesForm.setFurniture(this.furniture)
    }
  }
}
