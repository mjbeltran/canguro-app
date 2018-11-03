import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-forget-password',
  templateUrl: './dialog-forget-password.component.html',
  styleUrls: ['./dialog-forget-password.component.scss']
})
export class DialogForgetPasswordComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  confirm(){
    this.route.navigate(['/login']);
  }
}
