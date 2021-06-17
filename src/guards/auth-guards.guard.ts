import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardsGuard implements CanActivate {
  id:any;
  users:any;
  constructor(private router:Router,private usersservices:UserService,private route:ActivatedRoute) { 

  }
  canActivate():boolean {
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user')!)
      this.id = this.route.snapshot.params.id
      this.usersservices.findOne(this.id).subscribe((data:any)=>{
       this.users = data
      })
      if(token || this.users?.verify == 'valid' ||  this.users?.accountStatus == 'admin'){
        return true;
      }else{
        this.router.navigate(['/forbidden'])
        return false
      }
    
  }
  
}
