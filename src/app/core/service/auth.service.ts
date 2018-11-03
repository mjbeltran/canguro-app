import { IUser, INanny } from '../../shared/interfaces';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string;

  private userRef: AngularFirestoreDocument<IUser>;

  private user: Observable<IUser>;

  private currentUser: firebase.User = null;

  private authState: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth,
    private authService: AngularFirestore) {
    this.authState = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.userId = user.uid;
      }
      else {
        this.currentUser = null;
      }
    });
  }

  getUserId(): string {
    return this.userId;
  }

  getUser(): Observable<IUser> {
    return this.user;
  }

  isLogin(): boolean {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email.trim())
      .then(() => console.log('sent Password Reset Email'))
      .catch((error) => console.log(error));
  }

  getAuthState() {
    return this.authState;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email.trim(), value.password.trim())
        .then(res => {
          this.pushUserData(res.user, value.firstName, value.lastName);
          resolve(res);

        }, err => reject(err))
    });
  }

  private pushUserData(user, firstName: string, lastName: string) {
    this.authService.doc(`users/${user.uid}`).set({
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      userId: user.uid,
      admin: false
    })
      .then(function () {
        console.log("written successfully!");
      })
      .catch(function (error) {
        console.error("error writing to firestore", error);
      });
  }

  addNanny(value) {
    let newUID = this.authService.createId();
    this.authService.collection(`nannies`).doc(newUID).set({
      firstName: value.firstName,
      lastName: value.lastName,
      age: value.age,
      uid: newUID,
      gender: value.gender,
      location: value.location,
      yearOfExp: value.yearOfExp,
      rate: value.rate
    })
      .then(function () {
        console.log("written to nannies successfully");
      })
      .catch(function (error) {
        console.log("written to nannies failed");
      });
  }

  getUserData() {
    this.userRef = this.authService.collection<IUser>('users').doc(this.userId);
    this.user = this.userRef.valueChanges();
    return this.user;
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

}
