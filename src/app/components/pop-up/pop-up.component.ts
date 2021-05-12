import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() showPopUp:any;
  @Input() idReceiver:any;
  @Output() message:any;
  conversationId:any;
  allConversation:any;
  allConversationOnInit:any;
  messageForm!:FormGroup;
  onlineUser:any;
  messages:any;
  notification:any=[];
  conversations:any;
  conversationsCurrent:any;
  showConv:any;
  constructor(private conversationServices:ConversationService,private formBuilder:FormBuilder,private userServices:UserService,private websocket:WebsocketService) { }
  ngOnInit(): void {
    
    this.onlineUser = JSON.parse(localStorage.getItem('user')!);
    this.conversations= {_id:null}
   
    this.userServices.findOne(this.onlineUser._id).subscribe((responseConv:any) =>{
      if(responseConv.conversation.length>0){
        responseConv.conversation.map((x:any) =>{
      
          
          this.conversationServices.getOneConversation(x._id).subscribe(
            (response:any) =>{
              if (response.users.includes(this.idReceiver)){
                this.conversations = response;  
            }
          })
        })
  }})
  
    this.messageForm = this.formBuilder.group({
      message:['']
    })
    setInterval(()=>{
      this.getConversation()
     },1000)
  }
  exitPopUp(){
    this.showPopUp = !this.showPopUp
    console.log(this.showPopUp);
  }
 
  startConversation(idReceiver:any,id:any){ 
    if(id != null){
      this.conversationServices.getOneConversation(id).subscribe(
        (response:any) =>{
          this.conversationId = {
            _id:response._id,
            message:{
              content:this.messages,
              id:this.idReceiver
            }
         }
         this.websocket.sendMessage(this.conversationId);
    })
    }else{
      this.conversationId = {
        users:[this.onlineUser._id,idReceiver],
        message:{content:this.messages,id:this.idReceiver}
      }
      this.websocket.sendMessage(this.conversationId)
      
    }
    this.websocket.receiveMessage().subscribe((data:any) =>{
      this.conversations  = data;
      console.log(this.conversations);
      this.getConversation()
    
    })
   
  }
  getConversation(){
  this.userServices.findOne(this.onlineUser._id).subscribe((responseConv:any) =>{
    
    if(responseConv.conversation.length>0){
      responseConv.conversation.map((conversation:any) =>{
        this.conversationServices.getOneConversation(conversation._id).subscribe(
          (response:any) =>{
            if (response.users.includes(this.idReceiver)){
            this.conversations = response      
            }
           
          })
        })
    }

  })
  }
}
    