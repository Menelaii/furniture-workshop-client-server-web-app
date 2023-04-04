import {Component, OnInit} from '@angular/core';
import {ReviewsService} from "../../../shared/services/reviews.service";
import {Review} from "../../../shared/interfaces/review";
import {Utils} from "../../../shared/services/utils";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {
  carouselItemsCount = 1
  reviews: Review[] = []
  loading = false
  isAuthenticated = false

  constructor(private service: ReviewsService,
              private authService: AuthService,
              public utils: Utils) {
    this.isAuthenticated = authService.isAuthenticated()
  }

  ngOnInit(): void {
    this.fetchReviews()
  }

  fetchReviews() {
    this.loading = true
    this.service.getAll().subscribe(reviews => {
      this.carouselItemsCount = reviews.length % 3 == 0
        ? reviews.length / 3
        : Math.floor(reviews.length / 3 + 1)
      this.reviews = reviews
      this.loading = false
    })
  }

  onRemoveButtonClick(id: number) {
    this.service.delete(id).subscribe(r => {
      console.log(r)
      this.fetchReviews()
    })
  }
}
