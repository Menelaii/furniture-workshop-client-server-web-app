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
  initialCenterPage = 4
  centerIndex = (this.buttonsMax - 1) / 2

  constructor() {
    this.createButtons(this.totalPages)
  }

  ngOnInit() {
    this.redraw()
  }

  onPageButtonClick(button: PageButton) {
    if (button == this.selectedButton || button.isDisabled) return

    window.location.href='#examples'
    this.currentPage = button.page

    this.redraw()
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

  createButtons(activeAmount:  number) {
    if (activeAmount > this.buttonsMax) {
      activeAmount = this.buttonsMax
    }

    this.buttons = new Array<PageButton>(activeAmount)
    for (let i = 0; i < this.buttonsMax; i++) {
      this.buttons[i] = new PageButton(i, i + 1, false, false)
    }
  }

  redraw() {
    if (this.currentPage < this.initialCenterPage) {
      this.select(this.buttons[this.currentPage - 1])

      if (this.isShifted()) {
        this.resetPages(this.initialCenterPage, this.centerIndex)
      }
    } else if (this.currentPage > this.buttons[this.centerIndex].page) {
      this.applyOffset(this.currentPage - this.buttons[this.centerIndex].page)
      this.select(this.buttons[this.centerIndex])
    } else {
      this.select(this.buttons[this.centerIndex])
    }

    this.disableUnnecessaryButtons()
  }

  isShifted():boolean {
    return this.buttons[0].page != 1
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

  applyOffset(offset: number) {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].page += offset
    }
  }

  disableUnnecessaryButtons() {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].isDisabled = this.buttons[i].page > this.totalPages
    }
  }
}
