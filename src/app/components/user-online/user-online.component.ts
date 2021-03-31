import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';
import { PublicEntitiesService } from '../public-entities.service';
@Component({
  selector: 'app-user-online',
  templateUrl: './user-online.component.html',
  styleUrls: ['./user-online.component.css']
})
export class UserOnlineComponent implements OnInit {
  
    users:any=[];
    tabUser:any=[];
    checkOnline:any;
    onlineUser:any;
    events:any = new EventEmitter()
    
    constructor(private websocket:WebsocketService,private conversationServices:ConversationService,private userServices:UserService,private publicEntities:PublicEntitiesService) { 
     
    }

    ngOnInit():void{
    this.websocket.event.on('ConnectionChanges',() => {
      this.users = this.websocket.users
      this.onlineUser = JSON.parse(localStorage.getItem('user')!)
      console.log(this.users);
      console.log(this.onlineUser);
      
    })
    console.log(this.publicEntities.showPopUp);
    
    //this.conversationServices.getOneConversation(){}
  }

   startConversation(idOnwer:any,idReceiver:any){
    this.conversationServices.createConversation(idOnwer,idReceiver).subscribe(response =>{
    console.log("start conversation");
     })
}
  startPopUp(){
    this.publicEntities.showPopUp = true
  }
}
