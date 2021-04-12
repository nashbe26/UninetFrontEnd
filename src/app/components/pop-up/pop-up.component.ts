import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConversationService } from 'src/services/conversation/conversation.service';

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
  constructor(private conversationServices:ConversationService,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    console.log(this.showPopUp);
    
    this.conversationServices.getAllConversation().subscribe( results =>{
      this.allConversationOnInit= results
      console.log( this.allConversationOnInit);
      
    })
    
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    console.log(this.idReceiver);
    
    this.messageForm = this.formBuilder.group({
      message:['']
      
    })
  }
  exitPopUp(){
    this.showPopUp = !this.showPopUp
    console.log(this.showPopUp);
  }
 
  startConversation(idReceiver:any){
    this.allConversationOnInit.map((x:any)=>{
      if(x.users.indexOf(idReceiver)>-1 && x.users.indexOf(idReceiver)>-1){
        console.log(x);
      }
    })
    this.conversationId = {
      users:[this.onlineUser._id,idReceiver],
      message:{content:this.messages}
    }
    console.log("start conversation",this.conversationId);
    this.conversationServices.createConversation(this.conversationId).subscribe((response:any) =>{
    console.log('from createConversation',response);
      console.log(this.allConversation    );
      this.conversationServices.getAllConversation().subscribe( results =>{
        
        this.allConversation= results

    
      })

    })}
}
