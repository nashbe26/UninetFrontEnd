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
  @Output() message:any;
  conversationId:any;
  messageForm!:FormGroup;
  constructor(private conversationServices:ConversationService,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    
    this.conversationServices.getOneConversation("6069b312dfb9be2bb4e87b4d").subscribe((reponse:any) =>{
      console.log(reponse)
    })
    this.messageForm = this.formBuilder.group({
      message:['']
      
    })
  }
  exitPopUp(){
    this.showPopUp = !this.showPopUp
  }
  onSubmit(){
    this.conversationId = {
      idOnwer:this.idOnline._id,
      idReceiver:this.id,
      message:{content:this.message}
    }
    this.message =this.messageForm.value
  }
}
