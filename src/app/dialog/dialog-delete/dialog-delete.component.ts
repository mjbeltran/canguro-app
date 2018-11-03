import { NannyService } from './../../nanny/nanny.service';
import { INanny } from './../../shared/interfaces';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  nanny: INanny;
  constructor(private naanyService: NannyService, @Inject(MAT_DIALOG_DATA)public data: any) {
    this.nanny = data.nanny;
  }

  ngOnInit() {
  }

  confirm(){
    this.naanyService.deleteNanny(this.nanny, this.nanny.uid);
  }
}
