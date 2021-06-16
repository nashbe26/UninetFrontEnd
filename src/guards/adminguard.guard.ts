import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
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
    console.log(user.verify);
    
    if(token){
      if( user.accountStatus === 'admin'){
        return true;

      }else{
        return false
      }
    }else{


      this.router.navigate(['/forbidden'])
      return false
    }
  
}
  
}
