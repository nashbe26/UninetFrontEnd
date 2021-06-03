import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeworkResponseService } from 'src/services/homework/homework-response.service';

@Component({
  selector: 'app-reponse-homework',
  templateUrl: './reponse-homework.component.html',
  styleUrls: ['./reponse-homework.component.css']
})
export class ReponseHomeworkComponent implements OnInit {

  constructor(private homeworkServices:HomeworkResponseService,private route: ActivatedRoute,private httpClient:HttpClient) { }
  id:any;
  homework:any;
  images:any;
  newFile:any;
  imagepath:any;
  postStruct:any;
  postForm!:FormGroup;
  onlineUser:any;
  ngOnInit(): void {
    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl()
    })
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)

    this.id= this.route.snapshot.params.id;
    this.homeworkServices.gethomeworkById(this.id).subscribe((data:any)=>{
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
    this.postStruct = {
      content:this.postForm.value.userPost,
      date:new Date(),
      userId:this.onlineUser._id,
      src:this.newFile
    }
     this.homeworkServices.addhomework(this.postStruct).subscribe((data:any)=>{
      console.log(data);
      
     })
   }
}
