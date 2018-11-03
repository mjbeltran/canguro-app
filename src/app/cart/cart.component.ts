import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../core/service/auth.service';
import { DataService } from './../core/service/data.service';
import { CartService } from './../core/service/cart.service';
import { INanny, ICreditCard, IAddress } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogNotLoggedInComponent } from '../dialog/dialog-not-logged-in/dialog-not-logged-in.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  history: INanny[];
  dateNow: Date;
  total: number = 0;
  none: boolean = true;
  isOptional: boolean = false;
  creditCard: FormGroup;
  address: FormGroup;
  tempNanny: INanny;
  creditCardSubmitted: boolean = false;
  addressSubmitted: boolean = false;
  creditCardChecked: boolean = false;
  savedCreditCard: ICreditCard;
  addressChecked: boolean = false;
  savedAddress: IAddress;

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  constructor(private cart: CartService,
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog, private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    this.createCreditCardForm();
    this.createAddressForm();
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

      this.dataService.getCreditCardInfo().subscribe(info => {
        this.savedCreditCard = info['value'];
        this.setCreditCardForm();
      });

      this.dataService.getSavedAddress().subscribe(address => {
        this.savedAddress = address['value'];
        this.setAddressForm();
      });
    }
  }

  get cf() {
    return this.creditCard.controls;
  }

  createCreditCardForm() {
    this.creditCard = this.fb.group({
      creditCardNo: ['', Validators.required],
      expDate: ['', Validators.required],
      cvv: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  setCreditCardForm() {
    if (this.savedCreditCard != null) {
      this.creditCard.setValue({
        creditCardNo: this.savedCreditCard.creditCardNo,
        cvv: this.savedCreditCard.cvv,
        expDate: this.savedCreditCard.expDate,
        name: this.savedCreditCard.name
      });
    }
  }

  get af() {
    return this.address.controls;
  }

  createAddressForm() {
    this.address = this.fb.group({
      address1: ['', Validators.required],
      address2: [''],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  setAddressForm(){
    if (this.savedAddress != null){
      this.address.setValue({
        address1: this.savedAddress.address1,
        address2: this.savedAddress.address2,
        zipCode: this.savedAddress.zipCode,
        city: this.savedAddress.city,
        state: this.savedAddress.state,
        country: this.savedAddress.country
      })
    }
  }

  toggleCreditCardChecked() {
    this.creditCardChecked = !this.creditCardChecked;
  }

  toggleAddressChecked(){
    this.addressChecked = !this.addressChecked;
  }

  purchase() {
    this.dateNow = new Date();
    for (let i of this.history) {
      i.timestamp = this.dateNow;
    }
    this.dataService.checkout(this.history);
    this.clear();
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

  cartNotEmpty() {
    return this.history.length != 0;
  }

  saveCart() {
    if (!this.authService.isLogin()) {
      this.openDialog();
    }

    if (this.history.length != 0 && this.authService.isLogin()) {
      this.dataService.save(this.history, this.total);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogNotLoggedInComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('the dialog was closed');
    });
  }

  redirect() {
    this.router.navigate(['/nanny']);
  }

  home() {
    this.router.navigate(['']);
  }

  creditCardForm() {
    this.creditCardSubmitted = true;
    if (this.creditCardChecked) {
      this.dataService.saveCreditCard(this.creditCard.value);
    }
  }

  addressForm() {
    this.addressSubmitted = true;
    if(this.addressChecked){
      this.dataService.saveAddress(this.address.value);
    }
  }
}