import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChequeslistComponent } from './chequeslist/chequeslist.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { TestComponent } from './test/test.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { CurrentorderComponent } from './currentorder/currentorder.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule }   from '@angular/forms';
import {MatSnackBarModule } from '@angular/material';
import { AgmDirectionModule } from 'agm-direction';

import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';
import { LocationpickerComponent } from './locationpicker/locationpicker.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MobileComponent } from './mobile/mobile.component';

const appRoutes: Routes = [

  {
 path:  'mobile',
 component:  MobileComponent,
 children: [

   { path: 'home', component: HomeComponent },
     { path: '', component: TestComponent },
   { path: 'dashboard', component: DashboardComponent },
   { path: 'account', component: AccountComponent },
 { path: 'cart', component: CartComponent },
 {path:'currentorder',component:CurrentorderComponent},
 { path: 'Search', component: SearchComponent },
 { path: 'checkout', component: CheckoutComponent },

 {path:'location',component:LocationpickerComponent},
]},
{ path: '', component: ChequeslistComponent }


];
//

@NgModule({
  declarations: [
    AppComponent,
    ChequeslistComponent,
    DashboardComponent,
    HomeComponent,
    TestComponent,
    AccountComponent,
    CartComponent,
    SearchComponent,
    CurrentorderComponent,
    LocationpickerComponent,
    CheckoutComponent,
    MobileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
OwlModule,
HttpModule,
FormsModule,
CookieModule.forRoot(),
AgmCoreModule.forRoot({
   apiKey: 'AIzaSyD1Sycc5CNd8Y42QfsRTF5b5sooYFhaZEU'
   /* apiKey is required, unless you are a
   premium customer, in which case you can
   use clientId
   */
   //
 }),
 AgmDirectionModule,
    RouterModule.forRoot(
     appRoutes,
     { enableTracing: false } // <-- debugging purposes only
   )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
