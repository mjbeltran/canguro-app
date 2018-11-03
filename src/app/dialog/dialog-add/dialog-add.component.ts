import { AuthService } from './../../core/service/auth.service';
import { INanny } from './../../shared/interfaces';
import { NannyService } from './../../nanny/nanny.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  value: INanny;
  constructor(@Inject(MAT_DIALOG_DATA)public data: any,
    private router: Router, private authService: AuthService) {
      this.value = data.value;
     }

  ngOnInit() {
  }

  confirm() {
    this.authService.addNanny(this.value);
    this.router.navigate(['/nanny']);
  }
}
