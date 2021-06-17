import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminguardGuard } from 'src/guards/adminguard.guard';
import { AuthGuardsGuard } from 'src/guards/auth-guards.guard';
import { AuthentifactionSuccessGuard } from 'src/guards/authentifaction-success.guard';
import { CoursServicesService } from 'src/services/coursServices/cours-services.service';
import { CoursComponent } from './backoffice/cours/cours.component';
import { HomepageComponent } from './backoffice/homepage/homepage.component';
import { UsersComponent } from './backoffice/users/users.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { CoursListComponent } from './components/cours-list/cours-list.component';
import { CreateHomeworkComponent } from './components/create-homework/create-homework.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GetHoemworkComponent } from './components/get-hoemwork/get-hoemwork.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupComponent } from './components/group/group.component';
import { HomeComponent } from './components/home/home.component';
import { HomeworkListComponent } from './components/homework-list/homework-list.component';
import { HomeworkComponent } from './components/homework/homework.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { OnehomeworkComponent } from './components/onehomework/onehomework.component';
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
  { path:'homeWork/:id',component:HomeworkComponent,canActivate: [AuthGuardsGuard]},
  { path:'createHomework',component:CreateHomeworkComponent,canActivate: [AuthGuardsGuard]},
  { path:'forbidden',component:ForbiddenComponent},
  { path:'logout',component:SignoutComponent},
  { path:'getHomework/:id',component:GetHoemworkComponent},
  { path:'oneHomework/:id',component:OnehomeworkComponent},
  { path:'group/:id',component:GroupComponent,canActivate: [AuthGuardsGuard]},
  { path:'cours/:id',component:CoursListComponent,canActivate: [AuthGuardsGuard]},
  { path:'groupList/:id',component:GroupListComponent,canActivate: [AuthGuardsGuard]},
  { path:'homeworkList',component:HomeworkListComponent,canActivate: [AuthGuardsGuard]},
  { path:'backoffice',component:HomepageComponent,canActivate: [AdminguardGuard]},
  { path:'backoffice/cours',component:CoursComponent,canActivate: [AdminguardGuard]},
  { path:'backoffice/professeur',component:UsersComponent,canActivate: [AdminguardGuard]},
  { path:'**',component:ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
