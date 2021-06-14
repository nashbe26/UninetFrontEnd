import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/services/group/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groupUser:any = [];
  id:any;
  users:any;
  onlineUser:any;

  constructor(private groupServices:GroupService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    console.log(this.onlineUser);
    
    this.id= this.route.snapshot.params.id;
    this.groupServices.getGroupById(this.id).subscribe((data:any)=>{
      this.groupUser = data
      console.log( this.groupUser);
    })
  }
  
  deletePost(id:any){
    this.groupServices.deleteGroup(id).subscribe((posts:any)=>{
      this.groupUser.groupId.map((x:any,index:any)=>{
        if(posts._id == x._id){
          this.groupUser.groupId.splice(index,1);
        };
      })
    })
}
}
