import { CartService } from './../../core/service/cart.service';
import { DialogDeleteComponent } from '../../dialog/dialog-delete/dialog-delete.component';
import { Router } from '@angular/router';
import { DataService } from '../../core/service/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogNotLoggedInComponent } from '../../dialog/dialog-not-logged-in/dialog-not-logged-in.component';
import { AuthService } from '../../core/service/auth.service';
import { INanny } from '../../shared/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nanny-card',
  templateUrl: './nanny-card.component.html',
  styleUrls: ['./nanny-card.component.scss']
})
export class NannyCardComponent implements OnInit {
  history: INanny[] = [];
  tempNanny: INanny;
  dateNow: Date;
  p: number = 1;
  searchClick: boolean = false;
  total: number = 0;

  @Input() childNannies: INanny[]; // passing data from nanny.component
  @Input() userId: string;
  @Input() isAdminCheck: boolean;

  constructor(private authService: AuthService,
    private dataService: DataService,
    public dialog: MatDialog, private router: Router,
    private cart: CartService) {

  }

  ngOnInit() {
    this.searchClick = this.dataService.getSearchClick();
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

  openDeleteDialog(value): void {
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

  isLoggedIn() {
    return this.authService.isLogin();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogNotLoggedInComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    });
  }

  cartNotEmpty() {
    return this.history.length != 0;
  }

  add(people: INanny) {
    if (!this.history.includes(people)) {
      this.total += people.rate;
      this.history.push(people);
      this.cart.changeHistory(this.history);
      this.cart.changeTotal(this.total);
    }
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

  saveCart() {
    if (!this.authService.isLogin()) {
      console.log('user not logged in');
      this.openDialog();
    }

    if (this.history.length != 0 && this.authService.isLogin()) {
      this.dataService.save(this.history, this.total);
    }
  }

  edit(nanny: INanny) {
    this.router.navigate(['/nanny-edit', nanny.uid]);
  }

  removeNanny(nanny: INanny) {
    this.openDeleteDialog(nanny);
  }
}