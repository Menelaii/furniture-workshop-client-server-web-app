import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageButton} from "../page-button";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.sass']
})
export class PagesComponent implements OnInit {
  @Input() currentPage = 1
  @Input() totalPages = 7
  @Output() onPageClick: EventEmitter<number> = new EventEmitter<number>()
  buttons:PageButton[] = [{index: 0, page: 1, selected: true, isDisabled: false}]
  selectedButton: PageButton = this.buttons[0]
  buttonsMax = 7
  startCenterPage = 4

  ngOnInit() {
    this.createButtons(this.totalPages)
    this.startCenterPage = this.buttons[(this.buttons.length - 1) / 2].page

    let centerIndex = (this.buttons.length - 1) / 2
    let centerPage = this.startCenterPage
    let button = this.currentPage % this.buttons.length == 0
      ? this.buttons[this.buttons.length - 1]
      : this.buttons[this.currentPage % this.buttons.length - 1]

    if (button.index > centerIndex) {
      if (button.page + centerIndex > this.totalPages) {
        this.select(this.buttons[centerIndex + button.page % this.buttons.length])
        this.resetPages(this.totalPages - centerIndex, centerIndex)
      } else {
        this.select(this.buttons[centerIndex])
        this.resetPages(button.page, centerIndex)
      }
    } else {
      if (button.index < centerIndex && this.isShifted()) {
        let centerPage: number
        if (button.page >= this.startCenterPage) {
          centerPage = button.page
          this.select(this.buttons[centerIndex])
        } else {
          centerPage = this.startCenterPage
          this.select(this.buttons[button.page - 1])
        }
        this.resetPages(centerPage, centerIndex)
      } else {
        this.select(button)
      }
    }

    this.resetPages(centerPage, centerIndex)
  }

  onPageButtonClick(button: PageButton) {
    if (button == this.selectedButton || button.isDisabled) return

    window.location.href='#examples'
    this.currentPage = button.page
    this.onPageClick.emit(this.currentPage)
  }

  onNextButtonClick() {
    if (this.selectedButton.page == this.totalPages) {
      return
    }

    this.onPageButtonClick(this.buttons[this.selectedButton.index + 1])
  }

  onPreviousButtonClick() {
    if (this.selectedButton.page == 1) {
      return
    }

    this.onPageButtonClick(this.buttons[this.selectedButton.index - 1])
  }

  select(button: PageButton) {
    this.selectedButton.selected = false
    button.selected = true
    this.selectedButton = button
  }

  resetPages(centerPage:number, centerIndex:number) {
    for (let i = 0; i < this.buttons.length; i++) {
      if (i == centerIndex) this.buttons[i].page = centerPage
      else if (i < centerIndex) this.buttons[i].page = centerPage - Math.abs(centerIndex - i)
      else if (i > centerIndex) this.buttons[i].page = centerPage + Math.abs(centerIndex - i)
    }
  }

  createButtons(activeAmount:  number) {
    if (activeAmount > this.buttonsMax) {
      activeAmount = this.buttonsMax
    }

    this.buttons = new Array<PageButton>(activeAmount)
    for (let i = 0; i < this.buttonsMax; i++) {
      this.buttons[i] = {index: i, page: i + 1, selected: false, isDisabled: i >= activeAmount }
    }
  }

  isShifted():boolean {
    return this.buttons[0].page != 1
  }
}
