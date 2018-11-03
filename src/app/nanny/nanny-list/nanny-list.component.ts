import { CartService } from './../../core/service/cart.service';
import { DialogDeleteComponent } from '../../dialog/dialog-delete/dialog-delete.component';
import { Router } from '@angular/router';
import { DataService } from '../../core/service/data.service';
import { DialogNotLoggedInComponent } from '../../dialog/dialog-not-logged-in/dialog-not-logged-in.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../core/service/auth.service';
import { NannyService } from '../nanny.service';
import { INanny, IUser } from '../../shared/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nanny-list',
  templateUrl: './nanny-list.component.html',
  styleUrls: ['./nanny-list.component.scss']
})
export class NannyListComponent implements OnInit {

  
  history: INanny[] = [];
  nanny: INanny;
  dateNow: Date;
  userData: IUser;
  p: number = 1;
  total: number = 0;
  tempNanny: INanny;
  
  @Input() userId: string;
  @Input() childNannies: INanny[];
  @Input() isAdminCheck: boolean;

  constructor(private babyService: NannyService, private authService: AuthService,
    private dataService: DataService,
    public dialog: MatDialog, private router: Router,
    private cart: CartService) { 
  }

  ngOnInit() {
    this.cart.currentHistory.subscribe(history => {
      this.history = history;
    });

    this.cart.currentTotal.subscribe(total => {
      this.total = total;
    });

    if (this.authService.isLogin()) {
      this.dataService.getSavedCart().subscribe(res => {
        this.tempNanny = res;
        if (this.tempNanny != null) {
          this.history = this.tempNanny['history'];
          this.total = this.tempNanny['total'];
          this.cart.changeHistory(this.history);
          this.cart.changeTotal(this.total);
        }
      });
    }
  }

  isLoggedIn() {
    return this.authService.isLogin();
  }

  openDeleteDialog(value): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      nanny: value
    }

    const dialogRef = this.dialog.open(DialogDeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result: ${result}`);
      console.log('the dialog was closed');
    });
  }


  openDialog(){
    const dialogRef = this.dialog.open(DialogNotLoggedInComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    });
  }

  add(people: INanny) {
    if (!this.history.includes(people)) {
      this.total += people.rate;
      this.history.push(people);
      this.cart.changeHistory(this.history);
      this.cart.changeTotal(this.total);
    }
  }
  
  cartNotEmpty(){
    return this.history.length != 0;
  }

  clear() {
    this.history = [];
    this.cart.changeHistory(this.history);
    this.total = 0;
    this.cart.changeTotal(this.total);
    if (this.authService.isLogin()) {
      this.dataService.clearSavedCart();
    }
  }

  saveCart() {
    if(!this.authService.isLogin()){
      console.log('user not logged in');
      this.openDialog();
    }

    if (this.history.length != 0 && this.authService.isLogin()) {
      this.dataService.save(this.history, this.total);
    }
  }

  purchase() {
    if (!this.authService.isLogin()) {
      console.log('user not logged in');
      this.openDialog();
    }
    if (this.history.length != 0 && this.authService.isLogin()) {
      this.saveCart();
      this.router.navigate(['/cart']);
    }
  }

  edit(nanny: INanny){
    console.log('edit clicked!', nanny);
    this.router.navigate(['/nanny-edit', nanny.uid]);
  }

  removeNanny(nanny:INanny){
    this.openDeleteDialog(nanny);
  }
}
