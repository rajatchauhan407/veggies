import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {LoginComponent} from './auth/login/login.component'
import { CheckCompoComponent } from './learn/check-compo/check-compo.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/services/auth.guard';
import { BucketComponent } from './bucket/bucket.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'learn',component:CheckCompoComponent},
  {path:'bucket',component:BucketComponent},
  {path:'orders',component:OrdersComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
