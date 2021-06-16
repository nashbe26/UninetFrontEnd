import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatBadgeModule} from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { PostChildComponent } from './components/post-child/post-child.component';
import { PostsComponent } from './components/posts/posts.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { UserOnlineComponent } from './components/user-online/user-online.component';
import { ShortcutsComponent } from './components/shortcuts/shortcuts.component';
import { UserService } from '../services/userService/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { ViewerComponent } from './components/viewer/viewer.component';
import { GroupComponent } from './components/group/group.component';
import { PostsGroupComponent } from './components/posts-group/posts-group.component';
import { SignoutComponent } from './components/signout/signout.component';
import { TokenInterceptor } from 'src/guards/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgwWowModule } from 'ngx-wow';
import { HomeworkComponent } from './components/homework/homework.component';
import { CreateHomeworkComponent } from './components/create-homework/create-homework.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxEditorModule } from 'ngx-editor';
import { ReponseHomeworkComponent } from './components/reponse-homework/reponse-homework.component';
import { GetHoemworkComponent } from './components/get-hoemwork/get-hoemwork.component';
import { HomepageComponent } from './backoffice/homepage/homepage.component';
import { UsersComponent } from './backoffice/users/users.component';
import { CoursComponent } from './backoffice/cours/cours.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { NotifiListComponent } from './components/notifi-list/notifi-list.component';
import { CoursListComponent } from './components/cours-list/cours-list.component';
import { HomeworkListComponent } from './components/homework-list/homework-list.component';
import { OnehomeworkComponent } from './components/onehomework/onehomework.component';
import { SafePipe } from './pipe-name.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PostChildComponent,
    PostsComponent,
    AccueilComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    UserComponent,
    SettingsComponent,
    MessengerComponent,
    UserOnlineComponent,
    ShortcutsComponent,
    ForbiddenComponent,
    PopUpComponent,
    BroadcastComponent,
    ViewerComponent,
    GroupComponent,
    PostsGroupComponent,
    SignoutComponent,
    HomeworkComponent,
    CreateHomeworkComponent,
    ReponseHomeworkComponent,
    GetHoemworkComponent,
    HomepageComponent,
    UsersComponent,
    CoursComponent,
    GroupListComponent,
    NotifiListComponent,
    CoursListComponent,
    HomeworkListComponent,
    OnehomeworkComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    
    NgwWowModule,
    CKEditorModule,
    NgxEditorModule,
    MatPaginatorModule,

  ],
  providers: [
    UserService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
