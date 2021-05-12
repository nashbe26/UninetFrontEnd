import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardsGuard } from 'src/guards/auth-guards.guard';
import { AuthentifactionSuccessGuard } from 'src/guards/authentifaction-success.guard';
import { AccueilComponent } from './components/accueil/accueil.component';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GroupComponent } from './components/group/group.component';
import { HomeComponent } from './components/home/home.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignoutComponent } from './components/signout/signout.component';
import { UserComponent } from './components/user/user.component';
import { ViewerComponent } from './components/viewer/viewer.component';

const routes: Routes = [
  { path:'',component:HomeComponent,canActivate:[AuthentifactionSuccessGuard]},
  { path:'accueil',component:AccueilComponent,canActivate: [AuthGuardsGuard]},
  { path:'signUp',component:SignUpComponent,canActivate:[AuthentifactionSuccessGuard]},
  { path:'resetPassword',component:ResetPasswordComponent,canActivate:[AuthentifactionSuccessGuard]},
  { path:'forgotPassword',component:ForgotPasswordComponent,canActivate:[AuthentifactionSuccessGuard]},
  { path:'user/:id',component:UserComponent,canActivate: [AuthGuardsGuard]},
  { path:'settings',component:SettingsComponent,canActivate: [AuthGuardsGuard]},
  { path:'messenger/:id',component:MessengerComponent,canActivate: [AuthGuardsGuard]},
  { path:'broadcast/:id',component:BroadcastComponent,canActivate: [AuthGuardsGuard]},
  { path:'viewer/:id',component:ViewerComponent,canActivate: [AuthGuardsGuard]},
  { path:'forbidden',component:ForbiddenComponent},
  { path:'logout',component:SignoutComponent},
  { path:'group/:id',component:GroupComponent,canActivate: [AuthGuardsGuard]},
  { path:'**',component:ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
