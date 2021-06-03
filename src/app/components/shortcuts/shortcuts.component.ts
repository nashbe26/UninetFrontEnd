import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursServicesService } from 'src/services/coursServices/cours-services.service';
import { GroupService } from 'src/services/group/group.service';
import { HomeworkService } from 'src/services/homework/homework.service';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.css']
})
export class ShortcutsComponent implements OnInit {
  onlineUser:any;
  group:any;
  cours:any;
  homeworks:any;
  constructor(private groupServices:GroupService,private coursServices:CoursServicesService,private homeworkServices:HomeworkService,private router:Router) { }
  ngOnInit(): void {
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    this.groupServices.getGroupById(this.onlineUser._id).subscribe((groups:any)=>{
      console.log(groups);
      this.group = groups
    })
    this.coursServices.getCoursById(this.onlineUser._id).subscribe((cours:any)=>{
      this.cours = cours
    })
   this.homeworkServices.getHomeworkByUserId(this.onlineUser._id).subscribe((data:any)=>{
     console.log(data);
     
     this.homeworks = data
   }) 
  }

}
