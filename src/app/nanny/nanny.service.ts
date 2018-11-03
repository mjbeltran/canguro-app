import { INanny } from './../shared/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class NannyService {

  nannyCol: AngularFirestoreCollection<INanny>;
  nannies: Observable<INanny[]>;

  nannyRef: AngularFirestoreDocument<INanny>;
  nanny: Observable<INanny>;

  constructor(private afs: AngularFirestore) {
  }


  getNannyData() {
    this.nannyCol = this.afs.collection('nannies');
    this.nannies = this.nannyCol.valueChanges();
    return this.nannies;
  }

  getNannyById(uid: string) {
    this.nannyRef = this.afs.collection<INanny>('nannies').doc(uid);
    this.nanny = this.nannyRef.valueChanges();
    return this.nanny;
  }

  updateNanny(nanny: INanny, uid: string) {
    console.log('updateNanny uid', uid);
    this.nannyRef = this.afs.collection<INanny>('nannies').doc(uid);
    this.nannyRef.update({
      age: nanny.age,
      firstName: nanny.firstName,
      lastName: nanny.lastName,
      gender: nanny.gender,
      location: nanny.location,
      yearOfExp: nanny.yearOfExp,
      rate: nanny.rate
    })
      .then(function () {
        console.log("document updated!");
      })
      .catch(function () {
        console.log("document fail update!");
      });
  }

  deleteNanny(nanny: INanny, uid: string) {
    this.afs.collection<INanny>('nannies').doc(uid).delete().then(function() {
      console.log('document removed!');
    }).catch(function (error){
      console.log("error removing document: ", error);
    });
  }
}
