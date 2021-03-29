import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';
@Component({
  selector: 'app-user-online',
  templateUrl: './user-online.component.html',
  styleUrls: ['./user-online.component.css']
})
export class UserOnlineComponent implements OnInit {
  
    users:any=[];
    tabUser:any=[];
    checkOnline:any;
    events:any = new EventEmitter()
    
    constructor(private websocket:WebsocketService,private userServices:UserService) { 
     
    }

    ngOnInit():void{
    this.websocket.event.on('ConnectionChanges',() => {
      this.users = this.websocket.users
      console.log(this.users);
      
    })
  }
        
  
}
