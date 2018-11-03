import { NannyAddBottomsheetComponent } from './nanny-add/nanny-add-bottomsheet.component';
import { MatBottomSheetModule, MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NannyService } from './nanny.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { INanny, IUser } from '../shared/interfaces';
import { AuthService } from '../core/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nanny',
  templateUrl: './nanny.component.html',
  styleUrls: ['./nanny.component.scss']
})
export class NannyComponent implements OnInit {

  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  parentNannies: INanny[] = [];
  temp: INanny[] = [];
  searchForm: FormGroup;
  firstName: string;
  userId: string = "";
  isAdminCheck: boolean = true;
  userData: IUser;

  constructor(private nannyService: NannyService, private fb: FormBuilder,
    private authService: AuthService, private router:Router,
    private bottomSheet: MatBottomSheet) { }


  ngOnInit() {
    this.displayMode = DisplayModeEnum.Card; // initialize to card mode

    this.nannyService.getNannyData()
      .subscribe(nanny => {
        this.parentNannies = nanny;
        this.temp = nanny;
      });

    if (this.authService.isLogin()) {
      this.authService.getUserData()
        .subscribe(res => {
          this.userData = res;
          this.userId = this.userData.userId;
          this.isAdminCheck = this.userData.admin;
        });
    }

    this.searchForm = this.fb.group({
      firstName: ['', Validators.required]
    });
  }

  sort(str: string) {
    if (str === 'firstName') {
      this.parentNannies
        .sort((a, b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0));
    }
    else if (str === 'location') {
      this.parentNannies
        .sort((a, b) => (a.location > b.location) ? 1 : ((b.location > a.location) ? -1 : 0));
    }
    else if (str=== 'rate'){
      this.parentNannies
        .sort((a,b) => (a.rate > b.rate)  ? 1 : ((b.rate > a.rate)? -1 : 0));
    }
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }

  search(value) {
    if (value.firstName === '') {
      this.parentNannies = this.temp;
      return;
    }
    console.log('search clicked', value.firstName);
    this.firstName = value.firstName;
    this.firstName = this.firstName.toLowerCase().trim();
    // save origin value

    this.parentNannies = this.parentNannies.filter(s => s.firstName.toLowerCase().trim() == this.firstName);
  }

  openNannyAddBottomSheet(): void {
    this.bottomSheet.open(NannyAddBottomsheetComponent, {
      panelClass: 'custom-width'
    });
  }
  addNanny() {
    this.openNannyAddBottomSheet();
    //this.router.navigate(['/nanny-add']);
  }
}

enum DisplayModeEnum {
  Card = 0,
  List = 1
}