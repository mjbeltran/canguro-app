import { DialogUpdateSuccessComponent } from './../../dialog/dialog-update-success/dialog-update-success.component';
import { NannyService } from './../nanny.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INanny } from '../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-nanny-edit',
  templateUrl: './nanny-edit.component.html',
  styleUrls: ['./nanny-edit.component.scss']
})
export class NannyEditComponent implements OnInit {
  addForm: FormGroup;
  uid:string;
  nanny: INanny;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private nannyService: NannyService,
    private dialog: MatDialog ) { 
    this.route.params.subscribe( params => {
      this.uid = params['uid'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.nannyService.getNannyById(this.uid).subscribe( res => {
      this.nanny = res;
      this.setForm();
    });
  }

  setForm(){
    this.addForm.setValue({
      firstName: this.nanny.firstName,
      yearOfExp: this.nanny.yearOfExp,
      gender: this.nanny.gender,
      lastName: this.nanny.lastName,
      age: 25,
      location: this.nanny.location,
      rate: this.nanny.rate
    })
  }

  openDialog(value): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: this.uid,
      value: value
    }

    const dialogRef = this.dialog.open(DialogUpdateSuccessComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result: ${result}`);
      console.log('the dialog was closed');
    });
  }
  createForm(){
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      yearOfExp: ['', Validators.required],
      gender: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      location: ['', Validators.required],
      rate: ['', Validators.required]
    });
  }

  tryEdit(value){
    this.openDialog(value);
  }
}
