import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { Guid } from 'guid-typescript';
import { LinkBroadcastService } from 'src/services/link/link-broadcast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  idBroadcast:any;
  userToken:any
  liveSession:any;
  gid: any;
  onlineUser:any;
  links:any;
  param1:any;
  constructor(private websocket:WebsocketService,private route: ActivatedRoute,private linkServices:LinkBroadcastService) {
  }

  ngOnInit(): void {
    this.userToken = localStorage.getItem("token");
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
  }
  goToStream(){

    this.linkServices.showLinks(this.onlineUser._id).subscribe((results:any)=>{
      this.links=results
      console.log(results);
      
    })
  }
  joinLive(id:any){
    this.websocket.getUuid( id)
  }
  createLive(){
    this.gid = Guid.create();
    console.log("this.gid",this.gid.value);
    
    this.liveSession ={
      id:this.onlineUser._id,
      gid:this.gid.value,
      date:new Date(),
      url:`http://localhost:4200/broadcast/${this.gid}`
    }
    this.linkServices.createLink(this.liveSession).subscribe((data:any)=>{
      console.log('link added');
    })
  }
}
