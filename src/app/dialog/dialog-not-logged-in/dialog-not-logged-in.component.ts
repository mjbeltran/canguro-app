import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-not-logged-in',
  templateUrl: './dialog-not-logged-in.component.html',
  styleUrls: ['./dialog-not-logged-in.component.scss']
})
export class DialogNotLoggedInComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToLogin(){
    this.route.navigate(['/login']);
  }
}
