import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { EventEmitter } from 'events';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  message:any=[];
  events:any = new EventEmitter()
  conversation:any;
  conversationId:any;
  oneConversation:any
  id:any;
  idOnline:any;
  messageForm!:FormGroup;
  constructor(private websocket:WebsocketService,private conversationServices:ConversationService,private  activatedRoutes :ActivatedRoute,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message:['']
    })
    this.id=this.activatedRoutes.snapshot.params['id']
    this.idOnline =JSON.parse(localStorage.getItem('user')!);
    this.websocket.event.on('receiveMessage',() => {
      this.message = this.websocket.messageRec
      console.log(this.message);
      this.conversationServices.getAllConversation().subscribe(response=>{
        this.conversation = response
      })
    this.conversationServices.getOneConversation(this.id).subscribe(response =>{
      console.log(response);
      
    })
 
    })  
    this.conversationServices.getOneConversation("6069b312dfb9be2bb4e87b4d").subscribe( results =>{
      console.log(results)
    })
  }
  onSubmit(){
    this.conversationId = {
      idOnwer:this.idOnline._id,
      idReceiver:this.id,
      message:{content:this.message}
    }
   
    this.conversationServices.sendConversation(this.conversationId).subscribe( results =>{
      console.log(results)
      this.websocket.sendMessage(this.conversationId)
    })
   
  }
  onFormSubmit(){}
}
