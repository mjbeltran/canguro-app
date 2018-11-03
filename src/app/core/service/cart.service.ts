import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { INanny } from './../../shared/interfaces';
import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService{

  private historySource = new BehaviorSubject([]);
  private totalSource = new BehaviorSubject(0);
  currentTotal = this.totalSource.asObservable();
  currentHistory = this.historySource.asObservable();

  tempNanny: INanny
  constructor(private authService: AuthService,
    private dataService: DataService) { }

  changeHistory(history: INanny[]){
    this.historySource.next(history);
  }

  changeTotal(total: number){
    this.totalSource.next(total);
  }
}