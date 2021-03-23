import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path:'',component:HomeComponent},
  { path:'accueil',component:AccueilComponent},
  { path:'signUp',component:SignUpComponent},
  { path:'resetPassword',component:ResetPasswordComponent},
  { path:'forgotPassword',component:ForgotPasswordComponent},
  { path:'user',component:UserComponent},
  { path:'settings',component:SettingsComponent},
  { path:'messenger',component:MessengerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
