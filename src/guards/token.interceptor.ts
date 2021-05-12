import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/userService/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  jwtToken:any;
  constructor(private UserService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    this.jwtToken = localStorage.getItem('token')
    let tokenReq = request.clone({
      setHeaders:{
        Authorization:`bearer ${this.jwtToken}`
      }
    })
    return next.handle(tokenReq);
  }
}
