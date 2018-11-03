import { AuthService } from './../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  submitted: boolean = false;

  constructor(public authService : AuthService,
    private router: Router, private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
  }

  get f() {
    return this.registerForm.controls;
  }

  createForm(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  tryRegister(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.authService.doRegister(this.registerForm.value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.router.navigate(['/profile']);
      },
    err =>{
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
