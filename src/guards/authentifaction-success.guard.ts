import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentifactionSuccessGuard implements CanActivate {
  constructor(private router:Router) { 

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const token = localStorage.getItem('token')
      if(token){
        this.router.navigate(['/accueil'])
        return false;
      }else{
        
        return true
      }
  }
  
}
