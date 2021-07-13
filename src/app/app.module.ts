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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OtpDialogComponent } from './auth/sign-up/otp-dialog/otp-dialog.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { OtpLoginComponent } from './auth/login/otp-login/otp-login.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { BucketComponent } from './bucket/bucket.component';
import { ConfirmDialogComponent } from './bucket/confirm-dialog/confirm-dialog.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { UpdatePricesComponent } from './admin/update-prices/update-prices.component';
import { HightlightDirective } from './directive/hightlight.directive';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AddVegeComponent } from './admin/add-vege/add-vege.component';
import { CropperDialogComponent } from './admin/add-vege/cropper-dialog/cropper-dialog.component';
import { LogComponent } from './log/log.component';
import { DashBoardComponent } from './log/dash-board/dash-board.component';


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
    OtpLoginComponent,
    BucketComponent,
    ConfirmDialogComponent,
    OrdersComponent,
    AdminComponent,
    UpdatePricesComponent,
    HightlightDirective,
    AdminLoginComponent,
    AddVegeComponent,
    CropperDialogComponent,
    LogComponent,
    DashBoardComponent
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
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
              ],
  bootstrap: [AppComponent],
  entryComponents:[ChooseQuantityPopUpComponent,
    OtpDialogComponent,
    ConfirmDialogComponent,
    OtpLoginComponent,
    CropperDialogComponent]
})
export class AppModule { }
