import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckCompoComponent } from './learn/check-compo/check-compo.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    CheckCompoComponent,
    SidenavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
