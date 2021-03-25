import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardsGuard implements CanActivate {
  constructor(private router:Router) { 

  }
  canActivate():boolean {
      const token = localStorage.getItem('token')
      if(token){
        return true;
      }else{
        this.router.navigate(['/forbidden'])
        return false
      }
    
  }
  
}
