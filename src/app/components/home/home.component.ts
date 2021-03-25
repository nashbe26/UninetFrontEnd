import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/services/userService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   userForm!:FormGroup;
   user:any ={};
  constructor(private formBuilder:FormBuilder, private userService:UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email:[''],
      passowrd:['']
    })
  }
  onFormSubmit(){
      this.userService.createUser(this.userForm.value).subscribe((data:any) =>{
      JSON.stringify(localStorage.setItem('token',JSON.stringify(data.jwtToken)));
    })
  }
}
