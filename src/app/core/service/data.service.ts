import { AuthService } from './auth.service';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { INanny, IUser, ICreditCard, IAddress } from './../../shared/interfaces';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private nannyRef: AngularFirestoreDocument<INanny>;

  private nanny: Observable<INanny>;

  private creditRef: AngularFirestoreDocument<ICreditCard>;

  private creditCard: Observable<ICreditCard>;

  private addressRef: AngularFirestoreDocument<IAddress>;

  private address: Observable<IAddress>;

  private checkoutRef: AngularFirestoreCollection<INanny>;

  private check: Observable<INanny[]>;

  private searchClick: boolean = false;

  constructor(private afs: AngularFirestore, private authService: AuthService) { 
  }

  setSearchClick(){
    this.searchClick = true;
  }

  getSearchClick(){
    return this.searchClick;
  }
  
  checkout(history: INanny[]) {
    const path = `users/${this.authService.getUserId()}`;
    this.afs.doc(path).collection('purchase').add(
      {
        history
      }
    )
      .then(()=> {
        console.log("written successfully");
        this.clearSavedCart();
      })
      .catch(function (error) {
        console.log("error writing to firestore", error);
      });
  }

  getCheckOut() {
    this.checkoutRef = this.afs.collection<IUser>('users').doc(this.authService.getUserId()).collection('purchase');
    this.check = this.checkoutRef.valueChanges();
    return this.check;
  }

  clearSavedCart() {
    this.afs.collection<IUser>('users').doc(this.authService.getUserId()).collection('savedCart').doc('savedCart').delete()
      .then(function () {
        console.log("removed doc successfully!");
      })
      .catch(function (error) {
        console.error("error removing document: ", error);
      });
  }


  getSavedCart() {
    this.nannyRef = this.afs.collection<IUser>('users').doc(this.authService.getUserId()).collection('savedCart').doc('savedCart');
    this.nanny = this.nannyRef.valueChanges();
    return this.nanny;
  }

  save(history: INanny[], total: number) {
    this.afs.doc(`users/${this.authService.getUserId()}`).collection('savedCart').doc('savedCart').set(
      {
        history,
        total
      }
    )
      .then(function () {
        console.log("written successfully");
      })
      .catch(function (error) {
        console.log("error writing to firestore", error);
      });
  }

  saveCreditCard(value){
    this.afs.doc(`users/${this.authService.getUserId()}`).collection('savedCreditCard').doc('savedCreditCard').set(
      {
        value
      }
    )
    .then(function () {
      console.log("credit card info saved");
    })
    .catch(function (error){
      console.log("error saving credit card info");
    });
  }

  getCreditCardInfo() {
    this.creditRef = this.afs.collection<ICreditCard>('users').doc(this.authService.getUserId()).collection('savedCreditCard').doc('savedCreditCard');
    this.creditCard = this.creditRef.valueChanges();
    return this.creditCard;
  }

  saveAddress(value){
    this.afs.doc(`users/${this.authService.getUserId()}`).collection('savedAddress').doc('savedAddress').set(
      {
        value
      }
    )
    .then(function () {
      console.log("address saved");
    })
    .catch(function (error){
      console.log("error saving address");
    });
  }

  getSavedAddress() {
    this.addressRef = this.afs.collection<IAddress>('users').doc(this.authService.getUserId()).collection('savedAddress').doc('savedAddress');
    this.address = this.addressRef.valueChanges();
    return this.address;
  }
}
