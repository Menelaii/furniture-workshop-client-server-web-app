export class PageButton {
  index: number
  page:number
  selected:boolean
  isDisabled:boolean


  constructor(index: number, page: number, selected: boolean, isDisabled: boolean) {
    this.index = index;
    this.page = page;
    this.selected = selected;
    this.isDisabled = isDisabled;
  }
}
