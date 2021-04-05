import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConversationService } from 'src/services/conversation/conversation.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  showPopUp:any;
  @Input() idReceiver:any;
  @Output() message:any;
  conversationId:any;
  messageForm!:FormGroup;
  onlineUser:any;
  constructor(private conversationServices:ConversationService,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    
    // this.conversationServices.getOneConversation("6069b312dfb9be2bb4e87b4d").subscribe((reponse:any) =>{
    //   console.log(reponse)
    // })
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)

    this.messageForm = this.formBuilder.group({
      message:['']
      
    })
  }
  exitPopUp(){
    this.showPopUp = !this.showPopUp
  }
  onSubmit(){
    this.conversationId = {
      users:[this.onlineUser._id,this.idReceiver],

      message:{content:this.message}
    }
    this.message =this.messageForm.value
  }
}
