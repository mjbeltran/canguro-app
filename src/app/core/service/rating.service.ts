import { Star } from './../../shared/interfaces';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private afs: AngularFirestore) { }

  getUserRating(userId){
    const starRef = this.afs.collection(`stars`, ref => ref.where(`userid`, `==`, userId));
    return starRef.valueChanges();
  }

  getNannyRating(nannyId){
    const starRef = this.afs.collection(`stars`, ref => ref.where(`nannyId`, `==`, nannyId));
    return starRef.valueChanges();
  }

  setStar(userId, nannyId, value){
    const star: Star = {userId, nannyId, value};

    const starPath = `stars/${star.userId}_${star.nannyId}`;

    return this.afs.doc(starPath).set(star);
  }
}
