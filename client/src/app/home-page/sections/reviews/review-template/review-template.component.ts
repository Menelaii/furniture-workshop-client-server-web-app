import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../../../shared/interfaces/review";
import {Utils} from "../../../../shared/services/utils";

@Component({
  selector: 'app-review-template',
  templateUrl: './review-template.component.html',
  styleUrls: ['./review-template.component.sass']
})
export class ReviewTemplateComponent implements OnInit {
  @Input() review: Review = {reviewer: '', text: '', stars: 0, id: 0}
  id:number = 0
  dotsId:string = ''
  moreTextId:string = ''
  readMoreId:string = ''
  shortText: string = ''
  moreText: string = ''
  symbolsInShort:number = 110
  isShort = false

  constructor(public utils:Utils) {
  }

  ngOnInit(): void {
    this.id = this.review.id
    this.dotsId = "dots" + this.id
    this.moreTextId = "more" + this.id
    this.readMoreId = "readMore" + this.id

    if (this.review.text.length <= this.symbolsInShort) {
      this.initializeWithShortText()
    } else {
      this.shortText = this.review.text.substring(0, this.symbolsInShort)
      this.moreText = this.review.text.substring(this.symbolsInShort, this.review.text.length - 1)
    }
  }

  onReadMoreClick() {
    const dots = document.getElementById(this.dotsId);
    const moreText = document.getElementById(this.moreTextId);
    const readMore = document.getElementById(this.readMoreId);

    if (dots == null || moreText == null || readMore == null) {
      return;
    }

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      readMore.innerHTML = "Читать дальше";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      readMore.innerHTML = "Свернуть";
      moreText.style.display = "inline";
    }
  }

  private initializeWithShortText() {
    this.isShort = true
    this.shortText = this.review.text

    const moreText = document.getElementById(this.moreTextId);
    const readMore = document.getElementById(this.readMoreId);
    if (moreText == null || readMore == null) {
      return;
    }

    moreText.style.display = "none"
    readMore.style.display = "none"
  }
}
