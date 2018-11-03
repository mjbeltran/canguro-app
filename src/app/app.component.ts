import { ThemeService } from './core/service/theme.service';
import { CartService } from './core/service/cart.service';
import { IUser } from './shared/interfaces';
import { AuthService } from './core/service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  user = null;
  count: number = 0;
  history = [];
  adminCheck: boolean = false;
  userData: IUser;
  theme: String;  

  constructor(public authService: AuthService, private router: Router,
    private cart: CartService, private themeService: ThemeService) {
    if(this.isLoggedIn()){
      this.authService.getUserData().subscribe(res => {
        this.userData = res;
        this.adminCheck = this.userData.admin;
        console.log('adminCheck', this.adminCheck);
      });
    }
  }

  ngOnInit() {
    //this.isDarkTheme = this.themeService.isDarkTheme;
    this.themeService.currentTheme.subscribe(theme => {
      this.theme = theme;
      console.log('theme', this.theme);
    });
    this.authService.getAuthState()
      .subscribe( 
        user => this.user = user
    );

    this.cart.currentHistory.subscribe(history => {
      this.history = history;
      this.count = this.history.length;
    });
  }

  ngOnDestroy(){
    this.cart.changeHistory([]);
    this.cart.changeTotal(0);
  }

  isAdmin(): boolean{
 
    return this.adminCheck;
  }

  isLoggedIn(){
    return this.authService.isLogin();
  }
  
  logout() {
    this.authService.logOut();
    this.router.navigate(['']);
    this.ngOnDestroy();
  }

  goPlace(place: string){
    this.router.navigate([place]);
  }

  setColor(theme:String){
    console.log('theme', theme);
    this.themeService.setTheme(theme);
  }
  
}
