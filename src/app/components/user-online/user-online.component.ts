import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';
@Component({
  selector: 'app-user-online',
  templateUrl: './user-online.component.html',
  styleUrls: ['./user-online.component.css']
})
export class UserOnlineComponent implements OnInit {
  
    users:any=[];
    onlineUser:any=[];
    tabUser:any=[];
    checkOnline:any;
    events:any = new EventEmitter()
    
    constructor(private websocket:WebsocketService,private conversationServices:ConversationService,private userServices:UserService) { 
     
    }

    ngOnInit():void{
      this.websocket.event.on('ConnectionChanges',() => {
      this.users = this.websocket.users
      this.onlineUser = JSON.parse(localStorage.getItem('user')!)
      console.log( this.onlineUser);
      
      
    })
  //this.conversationServices.getOneConversation(idOnwer:any)
  }
   startConversation(idOnwer:any,idReceiver:any){
      console.log(idOnwer,idReceiver)
      this.conversationServices.createConversation(idOnwer,idReceiver).subscribe(response =>{
      console.log("start conversation");
    })
  }
  
}
