import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpClient, HttpClientModule } from '@angular/common/http';


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
    ShortcutsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
