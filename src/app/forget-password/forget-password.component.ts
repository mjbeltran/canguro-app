import { DialogForgetPasswordComponent } from './../dialog/dialog-forget-password/dialog-forget-password/dialog-forget-password.component';
import { Router } from '@angular/router';
import { AuthService } from './../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  resetPassword = false;
  error: any;
  emailForm : FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder,
    private dialog: MatDialog) { 
    this.createForm();
  }

  ngOnInit() {
  }

  get ef(){
    return this.emailForm.controls;
  }

  createForm(){
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogForgetPasswordComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result: ${result}`);
      console.log('the dialog was closed');
    });
  }

  sendResetEmail(){
    console.log('email: ', this.emailForm.value.email);
    this.submitted = true;

    if(this.emailForm.invalid){
      console.log('error');
      return ;
    }

    this.authService.resetPassword(this.emailForm.value.email)
      .then(() => {
        this.resetPassword = true;
        this.openDialog();
      })
      .catch(_error => {
        this.error = _error;
      });
  }

}
