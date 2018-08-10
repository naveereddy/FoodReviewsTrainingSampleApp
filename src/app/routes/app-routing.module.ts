import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router'
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ReviewComponent } from '../components/review/review.component';
//All possible routes in project 
const routes : Routes=[
 { path:'', component : LoginComponent},
 { path:'dashboard', component: DashboardComponent},
 { path:'login', component: LoginComponent},

];
// Importing the routing module from angular
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports :[RouterModule]
})
export class AppRoutingModule { }
//  Routing components array
export const routingComponents = [ LoginComponent, DashboardComponent,ReviewComponent]
