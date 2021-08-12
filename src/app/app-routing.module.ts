import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginSignupComponent} from './components/login-signup/login-signup.component';
import {LoginComponent} from './components/login-signup/login/login.component';
import {PlayerComponent} from './components/player/player.component';
const routes: Routes = [
  { path:'',component: HomepageComponent},
  { path:'user',component: LoginSignupComponent , children : [
      {path:'login',component: LoginComponent}
  ]},
  { path:'player',component: PlayerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
