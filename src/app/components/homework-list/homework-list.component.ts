import { Component, OnInit } from '@angular/core';
import { HomeworkService } from 'src/services/homework/homework.service';
import * as moment from 'moment';
import { UserService } from 'src/services/userService/user.service';

@Component({
  selector: 'app-homework-list',
  templateUrl: './homework-list.component.html',
  styleUrls: ['./homework-list.component.css']
})
export class HomeworkListComponent implements OnInit {
  onlineUser:any;
  homework:any;
  checkUser:any
  constructor(private homeworkService:HomeworkService,private userServices:UserService) { }

  ngOnInit(): void {
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    this.homeworkService.getHomeworkByUserId(this.onlineUser._id).subscribe((data:any)=>{
      this.homework = data
    
    })
    this.userServices.findOne(this.onlineUser._id).subscribe((data:any)=>{
      console.log(data);
      
      this.checkUser = data
    })
  }

}
