import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   userForm!:FormGroup;
   user:any ={};
   errors:any;
   check:any;
  constructor(private formBuilder:FormBuilder, private userService:UserService,private websockets:WebsocketService,private router:Router) { }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      passowrd:['',[Validators.required,Validators.minLength(6)]]
    })
  } 
  onFormSubmit(){
      this.userService.loginUser(this.userForm.value).subscribe(
        (data:any)=> {
          console.log(data);
          
this.check =   data.user?.verify        
          if(this.check == "valid"){
            localStorage.setItem('token',data.jwtToken);
            localStorage.setItem('user',JSON.stringify(data.user));
            this.websockets.connect(data.jwtToken);
          }
           
            this.router.navigate(['./accueil']);
        
             
        },
        (error:any) =>{
          this.errors = error.error
          console.log(this.errors);
        }
      )
    }
}
