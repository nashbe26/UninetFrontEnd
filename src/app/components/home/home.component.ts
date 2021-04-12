import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private formBuilder:FormBuilder, private userService:UserService,private websockets:WebsocketService,private router:Router) { }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email:[''],
      passowrd:['']
    })
  }
  onFormSubmit(){
      this.userService.createUser(this.userForm.value).subscribe((data:any) =>{
      localStorage.setItem('token',data.jwtToken);
      localStorage.setItem('user',JSON.stringify(data.user));
      this.websockets.connect(data.jwtToken);
      this.router.navigate(['./accueil']);

      console.log(data);
    },error =>{
      console.log('error',error)
    })
  }
}
