import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomeworkService } from 'src/services/homework/homework.service';
import { UserService } from 'src/services/userService/user.service';

@Component({
  selector: 'app-onehomework',
  templateUrl: './onehomework.component.html',
  styleUrls: ['./onehomework.component.css']
})
export class OnehomeworkComponent implements OnInit {
  onlineUser:any;
  id:any;
  homework:any
  checkdate:any
  student:any
  class:any={}
  allUser:any
  constructor(private homeworkServices:HomeworkService,private usersServices:UserService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    this.id= this.route.snapshot.params.id;
    this.route.params.subscribe((params: Params) => {
        this.id = params.id;
        this.homeworkServices.gethomeworkById(this.id).subscribe((user:any)=>{          
          this.homework  = user
          this.student  = user.Student
          this.class.classRoom=user.classRoom,
          this.class.niveau=user.niveau
        })
    });
    setTimeout(() => {
      this.checkuser()
    }, 1000);
  }
  checkuser(){
    this.usersServices.getUserByclass(this.class).subscribe((data:any)=>{
      console.log(data);
      
      this.allUser = data;
      
    })
  }
}
