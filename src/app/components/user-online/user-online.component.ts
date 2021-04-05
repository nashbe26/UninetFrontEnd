import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    message:any=[];
    //messageForm!:FormGroup;
    users:any=[];
    tabUser:any=[];
    checkOnline:any;
    onlineUser:any;
    events:any = new EventEmitter()
    conversationId:any;
    showPopUp:any;
    showTab:any;
    checkedId:any=[];
    constructor(private websocket:WebsocketService,private formBuilder:FormBuilder,private conversationServices:ConversationService,private userServices:UserService,private publicEntities:PublicEntitiesService) { 
     
    }

    ngOnInit():void{  
      // this.messageForm = this.formBuilder.group({
      //   message:['']
      // })
      this.websocket.event.on('ConnectionChanges',() => {
      this.users = this.websocket.users
      this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    
   
    })
    this.showPopUp=this.showPopUp;

    
    //this.conversationServices.getOneConversation(){}
  }
 
   startConversation(idOnwer:any,idReceiver:any){
     
 
    console.log("start conversation");
    this.conversationServices.createConversation({idOnwer,idReceiver}).subscribe(response =>{
    console.log(response);
     })
}
  startPopUp(index:any){
    //this.checkedId.push(index)
    //console.log(this.checkedId);

    this.showTab =index;
    
  }
}
