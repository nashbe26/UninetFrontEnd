import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/userService/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!:FormGroup;  
  constructor(private frmbuilder:FormBuilder,private userService:UserService) {
    this.signupForm=this.frmbuilder.group({   
      firstName:['',[Validators.required,Validators.minLength(3)]], 
      lastName:['',[Validators.required,Validators.minLength(3)]], 
      email:['',[Validators.required,Validators.email]], 
      password:['',[Validators.required,Validators.minLength(6)]], 
      confirmPassword:['',[Validators.required,Validators.minLength(6)]], 
      accountStatus:['',[Validators.required]], 
      classRoom:['',[Validators.required]], 
      phoneNumber:['+216 ',[Validators.required,Validators.minLength(14)]], 
    }); 
   }

  ngOnInit(): void {

  }
  get f() { return this.signupForm.controls; };
  PostData(signupForm:any){ 
    this.userService.createUser(this.signupForm.value).subscribe((data:any)=>{
      console.log(data);
     })
    
  }
}
