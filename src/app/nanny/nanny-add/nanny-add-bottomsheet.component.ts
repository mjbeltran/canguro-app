import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogAddComponent } from './../../dialog/dialog-add/dialog-add.component';

@Component({
  selector: 'app-nanny-add-bottomsheet',
  templateUrl: './nanny-add-bottomsheet.component.html',
  styleUrls: ['./nanny-add-bottomsheet.component.scss']
})
export class NannyAddBottomsheetComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb:FormBuilder, private dialog: MatDialog,
    private bottomSheet: MatBottomSheetRef<NannyAddBottomsheetComponent>) { 
  }

  ngOnInit() {
    this.createAddForm();
  }

  get af(){
    return this.addForm.controls;
  }

  createAddForm(){
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

  openDialog(value): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      value: value
    }

    const dialogRef = this.dialog.open(DialogAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result: ${result}`);
      console.log('the dialog was closed');
      this.bottomSheet.dismiss();
    });
  }

  tryAdd(){
    console.log('addform', this.addForm.value);
    this.submitted = true;
    if(this.addForm.invalid){
      console.log('invalid addform');
      return ;
    }
    //this.authService.addNanny(value);
    this.openDialog(this.addForm.value);
    //this.router.navigate(['/nanny']);
  }
}
