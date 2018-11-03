import { INanny } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { RatingService } from './../core/service/rating.service';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() userId;
  @Input() nannyId;
  rating: number;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private ratingService: RatingService) { }

  ngOnInit() {
    this.stars = this.ratingService.getNannyRating(this.nannyId);

    this.avgRating = this.stars.pipe(map(arr => {
      const ratings = arr.map (v => v.value);
      return ratings.length ? (ratings.reduce((total, val) => total + val)/ arr.length).toFixed(2) : 'not reviewed';
    }));
  }

  starHandler(value){
    if(this.nannyId != "" && this.userId !=""){
      this.ratingService.setStar(this.userId, this.nannyId, value);
    }
  }

}
