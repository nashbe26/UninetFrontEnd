import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { HomeworkResponseService } from 'src/services/homework/homework-response.service';
import { HomeworkService } from 'src/services/homework/homework.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  constructor(private homeworkServices:HomeworkService,private route: ActivatedRoute,private homeworReskServices:HomeworkResponseService,private httpClient:HttpClient) { }
  id:any;
  homework:any;
  images:any;
  newFile:any;
  imagepath:any;
  postStruct:any;
  postForm!:FormGroup;
  onlineUser:any;
  checkUser:boolean = false;
  waitResponse: boolean = false;
  myParam:any
  ngOnInit(): void {
    this.id= this.route.snapshot.params.id;
    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl(),
      urlPost :new FormControl(),
    })
    
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    this.id= this.route.snapshot.params.id;
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);

    this.homeworkServices.checkUser(this.onlineUser._id,this.id).subscribe((user:any)=>{
      console.log(user,"dsffdfdfd");
      if (user.length   >0)   this.checkUser = true;
      this.waitResponse = true;
    })
    console.log(this.myParam);
    
    this.homeworkServices.gethomeworkById(this.myParam).subscribe((data:any)=>{
      this.homework  = data
    })
 
  }
  


  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  onSubmit1(){
    if(this.postForm.value.userFile!=null){
      this.newFile = this.postForm.value.userFile.replace('C:\\fakepath\\','');
      const formData = new FormData();
      formData.append('file', this.images);
  
      this.httpClient.post<any>('http://localhost:3000/file', formData).subscribe(
        (res:any) => {
          console.log(res);
          this.imagepath = res.path
          console.log(this.imagepath );
        },
        (err:any) => console.log(err)
      );
    }
    console.log(this.postForm.value);
    
    this.postStruct = {
      description:this.postForm.value.userPost,
      url:this.postForm.value.urlPost,
      date:new Date(),
      userId:this.onlineUser._id,
      file:this.newFile,
      homeworkId:this.id
    }
    console.log(this.postStruct );
    
     this.homeworReskServices.addhomework(this.postStruct).subscribe((data:any)=>{
      console.log(data);
      
     })
   }
  }