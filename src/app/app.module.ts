import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckCompoComponent } from './learn/check-compo/check-compo.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { PricesComponent } from './home/prices/prices.component';
import { ChooseQuantityPopUpComponent } from './home/prices/choose-quantity-pop-up/choose-quantity-pop-up.component';
import { HttpClientModule } from '@angular/common/http';
import { OtpDialogComponent } from './auth/sign-up/otp-dialog/otp-dialog.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { OtpLoginComponent } from './auth/login/otp-login/otp-login.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    CheckCompoComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    PricesComponent,
    ChooseQuantityPopUpComponent,
    OtpDialogComponent,
    SpinnerComponent,
    OtpLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ChooseQuantityPopUpComponent,OtpDialogComponent]
})
export class AppModule { }
