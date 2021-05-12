import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm!:FormGroup;
  constructor(private fb:FormBuilder,private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
    })
    }
    get f() { return this.emailForm.controls; };
    sendEmail(){
      console.log(this.emailForm.value);
      
      this.httpClient.post('http://localhost:3000/sendEmail',this.emailForm.value).subscribe((data:any)=>{
        console.log(data);
        
      })
    }
} 
