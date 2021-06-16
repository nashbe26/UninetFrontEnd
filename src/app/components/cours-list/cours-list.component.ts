import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursServicesService } from 'src/services/coursServices/cours-services.service';
import { UserService } from 'src/services/userService/user.service';

@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {

  constructor(private coursService:CoursServicesService,private route:ActivatedRoute,private user:UserService) { }
  onlineUser:any;
  users:any;
  id:any;
  ngOnInit(): void {
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    this.id= this.route.snapshot.params.id;
    this.user.findOne(this.id).subscribe((data:any)=>{
     this.users = data.cours      
    })
  }

}
