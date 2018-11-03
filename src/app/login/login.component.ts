import { IUser } from './../shared/interfaces';
import { DataService } from './../core/service/data.service';
import { AuthService } from './../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  user: Observable<firebase.User>;
  items: Observable<any[]>;
  error: any;

  currentUser: IUser;

  resetPassword = false;

  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private router: Router, public afAuth: AngularFireAuth,
    public af: AngularFireDatabase, public authService: AuthService,
    private fb: FormBuilder) {
    this.createForm();
    this.router = router;
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.authService.getUserData().subscribe(result => {
        this.currentUser = result;
      });
    }
  }

  isLoggedIn() {
    return this.authService.isLogin();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(value) {
    this.authService.doLogin(value)
      .then(res => {
        console.log('login succeed');
        this.router.navigate(['/profile']);
      }, err => {
        console.log(err);
        this.errorMessage = 'The email or password is incorrect!';
      })
  }

  logout() {
    this.authService.logOut();
  }
}
