import { CartService } from './core/service/cart.service';
import { DialogUpdateSuccessComponent } from './dialog/dialog-update-success/dialog-update-success.component';
import { DataService } from './core/service/data.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './core/service/auth.service';
import { environment } from './../environments/environment';
import { NannyService } from './nanny/nanny.service';
import { MaterialModule } from './material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NannyComponent } from './nanny/nanny.component';
import { AboutComponent } from './about/about.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error.component';
import { NannyCardComponent } from './nanny/nanny-card/nanny-card.component';
import { NannyListComponent } from './nanny/nanny-list/nanny-list.component';
import { RegisterComponent } from './register/register.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NotFoundComponent } from './not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogNotLoggedInComponent } from './dialog/dialog-not-logged-in/dialog-not-logged-in.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NannyEditComponent } from './nanny/nanny-edit/nanny-edit.component';
import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { RatingComponent } from './rating/rating.component';
import { AgmCoreModule } from '@agm/core';
import { DialogAddComponent } from './dialog/dialog-add/dialog-add.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { DialogForgetPasswordComponent } from './dialog/dialog-forget-password/dialog-forget-password/dialog-forget-password.component';
import { NannyAddBottomsheetComponent } from './nanny/nanny-add/nanny-add-bottomsheet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NannyComponent,
    AboutComponent,
    HomeComponent,
    ErrorComponent,
    NannyCardComponent,
    NannyListComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent,
    DialogNotLoggedInComponent,
    ForgetPasswordComponent,
    NannyEditComponent,
    DialogUpdateSuccessComponent,
    DialogDeleteComponent,
    RatingComponent,
    DialogAddComponent,
    CartComponent,
    ContactComponent,
    DialogForgetPasswordComponent,
    NannyAddBottomsheetComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    NgxPaginationModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component : HomeComponent
      },
      {
        path: 'nanny',
        component : NannyComponent
      },
      {
        path: 'about',
        component : AboutComponent
      },
      {
        path: 'login',
        component : LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'resetPassword',
        component: ForgetPasswordComponent
      },
      {
        path: 'nanny-edit/:uid',
        component: NannyEditComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYVDvESxy7QQZDeQTxfADgdJJhNtWjruE'
    })
  ],
  entryComponents:[DialogNotLoggedInComponent, DialogUpdateSuccessComponent,
                   DialogDeleteComponent, DialogAddComponent, 
                   DialogForgetPasswordComponent, NannyAddBottomsheetComponent],
  providers: [NannyService, AuthService, DataService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
