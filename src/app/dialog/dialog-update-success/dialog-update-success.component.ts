import { INanny } from './../../shared/interfaces';
import { NannyService } from './../../nanny/nanny.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-update-success',
  templateUrl: './dialog-update-success.component.html',
  styleUrls: ['./dialog-update-success.component.scss']
})
export class DialogUpdateSuccessComponent implements OnInit {

  uid: string;
  value: INanny;
  constructor(@Inject(MAT_DIALOG_DATA)public data: any, 
    private nannyService: NannyService, private router: Router) {
    this.uid = data.id;
    this.value = data.value;
    console.log('data', data);
   }

  ngOnInit() {
  }

  confirm(){
    console.log('value', this.value);
    console.log('uid', this.uid);
    this.nannyService.updateNanny(this.value, this.uid);
    this.router.navigate(['/nanny']);
  }
}
