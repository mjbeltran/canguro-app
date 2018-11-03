import { INanny } from './../shared/interfaces';
import { NannyService } from './../nanny/nanny.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lat: number = 41.409305;
  lng: number = 2.184838;
  
  parentNannies: INanny[] = [];

  constructor(private nannyService: NannyService) { }

  ngOnInit() {
    this.nannyService.getNannyData()
    .subscribe(nanny => {
      this.parentNannies = nanny;
    });
  }

}
