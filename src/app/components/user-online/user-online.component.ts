import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-user-online',
  templateUrl: './user-online.component.html',
  styleUrls: ['./user-online.component.css']
})
export class UserOnlineComponent implements OnInit {
  constructor(private websocket:WebsocketService,private userServices:UserService) { }
    users:any=[];
    tabUser:any=[];
    checkOnline:any;
    ngOnInit():void{
      this.websocket.getOnlineUser().then((res:any)=>{
          this.users = res
          console.log(this.users)
        }
      ).catch(err=>{
         console.log(err)
      })
      this.getTimeout();
  }
  getTimeout(){
    // setInterval(()=> { 
      this.websocket.getOnlineUser().then((res:any)=>{
        this.users = res
        console.log(this.users)
      }
    ).catch(err=>{
       console.log(err)
    })
    // }, 3000); 

  }
}
