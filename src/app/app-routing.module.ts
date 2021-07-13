import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {LoginComponent} from './auth/login/login.component'
import { CheckCompoComponent } from './learn/check-compo/check-compo.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/services/auth.guard';
import { BucketComponent } from './bucket/bucket.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { UpdatePricesComponent } from './admin/update-prices/update-prices.component';
import { AddVegeComponent } from './admin/add-vege/add-vege.component';
import { LogComponent } from './log/log.component'
import { DashBoardComponent } from './log/dash-board/dash-board.component';
import { DashGuardGuard } from './log/dash-guard.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'learn',component:CheckCompoComponent},
  {path:'bucket',component:BucketComponent},
  {path:'orders',component:OrdersComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin/update-prices',component:HomeComponent},
  {path:'admin/add-vege', component:AddVegeComponent},
  {path:'admin/add-vege/:id',component:AddVegeComponent},
  {path: 'login2', component: LogComponent},
  {path: 'dashboard', component: DashBoardComponent, canActivate:[DashGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
