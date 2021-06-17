import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { HomeworkService } from 'src/services/homework/homework.service';

@Component({
  selector: 'app-create-homework',
  templateUrl: './create-homework.component.html',
  styleUrls: ['./create-homework.component.css']
})
export class CreateHomeworkComponent implements OnInit {
  editor:any;
  html:any;
  postForm!:FormGroup;  
  onlineUser:any;
  constructor(private frmbuilder:FormBuilder,private homeWorkServices:HomeworkService) {
    this.postForm=this.frmbuilder.group({   
      description:['',[Validators.required,Validators.minLength(3)]], 
      NameHomework:['',[Validators.required,Validators.minLength(3)]], 
      matiere:['',[Validators.required,Validators.email]],
      niveau:['',[Validators.required]],
      classRoom:['',[Validators.required]],
      date:['',[Validators.required]],
      hours:['',[Validators.required]],
      })
    }
  ngOnInit(): void {
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    this.editor = new Editor();
  }
  onSubmit1(){
  
    this.postForm.value.userId = this.onlineUser._id
    this.postForm.value.da = this.onlineUser._id
    console.log(this.postForm.value);
      this.homeWorkServices.addhomework( this.postForm.value).subscribe((data:any)=>{
        window.location.reload();

      })
  }
}
