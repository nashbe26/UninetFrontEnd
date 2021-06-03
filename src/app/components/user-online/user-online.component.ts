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
    allOnlineUser:any=[];
    conversationId:any;
    showPopUp:any;
    showTab:any;
    checkedId:any=[];
    getConversations:any;
    allConversation:any;
    popUser:any=[];
    oneId:any;
    newUser:any=[];
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
            if (x != this.onlineUser._id ){
              this.users.map((x:any,index:any)=>{
                if (x == this.onlineUser._id ){
                  this.users.splice(index, 1); 
                }
              })

              this.userServices.findOne(x).subscribe((oneuser:any)=>{
                let check = this.newUser.find((x:any) =>x._id = oneuser._id)
                console.log(check);
                
                  if(check){
                    console.log("ahla");
                    
                    

                  }else{
                    this.newUser.push(oneuser)
                    
                  }
              }) 
            }
            console.log("sagxi ",this.newUser);
            
          })
        })

        
  }
  startPopUp(index:any){
    this.checkedId.push(index)
    for (const check of this.checkedId){
      this.showTab =check;
      this.showPopUp = true;
    }
    }

  
}
