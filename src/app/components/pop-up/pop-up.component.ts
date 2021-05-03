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
  constructor(private conversationServices:ConversationService,private formBuilder:FormBuilder,private userServices:UserService,private websocket:WebsocketService) { }
  ngOnInit(): void {
    
    this.onlineUser = JSON.parse(localStorage.getItem('user')!);
    this.conversations= {_id:null}
   
    this.userServices.findOne(this.onlineUser._id).subscribe((responseConv:any) =>{
      if(responseConv.conversation.length>0){
        responseConv.conversation.map((x:any) =>{
          console.log(x._id);
          
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

  }
  exitPopUp(){
    this.showPopUp = !this.showPopUp
    console.log(this.showPopUp);
  }
 
  startConversation(idReceiver:any,id:any){
    console.log(id);
    
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
      console.log("dsqdsqd",this.conversations);
      
    })
   
  }
  getConversation(){
  setInterval(() => {
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
  }})
  }, 1000); 

  }
}
    // this.userServices.findOne(this.onlineUser._id).subscribe((responseConv:any) =>{
    //   if(responseConv.conversation.length>0){
    //     responseConv.conversation.map((conversation:any) =>{
    //       console.log("this is from includes",conversation);
    //       this.conversationServices.getOneConversation(conversation).subscribe(
    //         (response:any) =>{
    //           console.log(response);
    //           if (response.users.includes(idReceiver)){
    //             console.log("this is from includes");
                
    //             this.conversationId = {
    //               _id:response._id,
    //               message:{content:this.messages}
    //             }
    //             console.log("start conversation",this.conversationId);
    //             this.conversationServices.createConversation(this.conversationId).subscribe((response:any) =>{
    //             console.log('from createConversation',response);
    //             })
    //             console.log(response);
    //           }else{
    //             console.log("this is from none includes when find didn't find a user");
    //             this.conversationId = {
    //               users:[this.onlineUser._id,idReceiver],
    //               message:{content:this.messages}
    //             }
    //             console.log("start conversation",this.conversationId);
    //             this.conversationServices.createConversation(this.conversationId).subscribe((response:any) =>{
    //             console.log('from createConversation',response);
    //             })
    //           }
    //         })
    //     })
    //   }else{
    //     this.conversationId = {
    //       users:[this.onlineUser._id,idReceiver],
    //       message:{content:this.messages}
    //     }
    //     console.log("when new user",this.conversationId);
    //     this.conversationServices.createConversation(this.conversationId).subscribe((response:any) =>{
    //     console.log('from createConversation',response);
    //     })
    //   }
    // })
    

 
    // this.allConversationOnInit.map((x:any)=>{
    //   if(x.users.indexOf(idReceiver)>-1 && x.users.indexOf(idReceiver)>-1){
    //     console.log(x);
    //   }
    // })

    // this.conversationId = {
    //   users:[this.onlineUser._id,idReceiver],
    //   message:{content:this.messages}
    // }
    // console.log("start conversation",this.conversationId);
    // this.conversationServices.createConversation(this.conversationId).subscribe((response:any) =>{
    // console.log('from createConversation',response);
    //   console.log(this.allConversation    );
    //   this.conversationServices.getAllConversation().subscribe( results =>{
    
    //     this.allConversation= results

    //   })

    // })}


