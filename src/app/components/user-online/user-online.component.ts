import { Component, Input, OnInit } from '@angular/core';
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
    @Input() users:any=[];
    tabUser:any=[];
    checkOnline:any;
    onlineUser:any;
    conversationId:any;
    showPopUp:any;
    showTab:any;
    checkedId:any=[];
    getConversations:any;
    allConversation:any;
    constructor(private websocket:WebsocketService,private formBuilder:FormBuilder,private conversationServices:ConversationService,private userServices:UserService,private publicEntities:PublicEntitiesService) { 
    }

    ngOnInit():void{  
      // this.messageForm = this.formBuilder.group({
      //   message:['']
      // })
      this.onlineUser = JSON.parse(localStorage.getItem('user')!)
  
        this.websocket.getOnlineUser().subscribe((data:any) =>{
          this.users= data;
          this.users.map((x:any,index:any)=>{
            console.log(x);
            if(x==this.onlineUser._id ){
              this.users.splice(index, 1);
            }
          })
        })
      
        console.log(this.onlineUser);
        
    }
  
 
  startPopUp(index:any){
    this.checkedId.push(index)
    for (const check of this.checkedId){
      this.showTab =check;
      this.showPopUp = true;
    }
    }
  // getConversation(receiver:any,sender:any){
  //   this.getConversations =[sender,receiver]
  //   console.log(this.getConversations);
    
  //   this.allConversation.map((x:any)=>{
      
  //     console.log(x.users.every((val:any, index:any) => val === this.getConversations[index]));
      
  //   });
    
    // console.log(  this.allConversation.users.include(this.getConversations.users));
  
    // this.conversationServices.getOneConversation(this.getConversations).subscribe(data =>{
    //   console.log("this is" ,data);
      
    // })
  
}
