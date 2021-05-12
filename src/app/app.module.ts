import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

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
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatBadgeModule
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
