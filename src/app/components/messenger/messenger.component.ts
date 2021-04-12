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
  newMessage:any=[];
  constructor(private websocket:WebsocketService,private conversationServices:ConversationService,private  activatedRoutes :ActivatedRoute,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message:['']
    })
    this.id=this.activatedRoutes.snapshot.params['id']
    this.idOnline =JSON.parse(localStorage.getItem('user')!);

    this.conversationServices.getOneConversation("606bae3b1685fa4b249e50c7").subscribe( results =>{
      console.log(results)
    })
    this.websocket.event.on('MessageChanges',() => {      
      
      console.log("sqdsq",this.newMessage);
    })
    this.websocket.receiveMessage().subscribe(data =>{
      console.log(data);
      this.newMessage= data;
      console.log(this.newMessage);
    })
  }
  onSubmit(){
    this.conversationId = {
      _id:"606bb3751685fa4b249e50e1",
      users:[this.idOnline._id,this.id],
      message:{content:this.message}
    }
    this.websocket.sendMessage(this.conversationId)
  }
  
}


















    // this.websocket.event.on('receiveMessage',() => {
    //   this.message = this.websocket.messageRec
    
    //   this.conversationServices.getAllConversation().subscribe(response=>{
    //     this.conversation = response
    //   })
    // this.conversationServices.getOneConversation(this.id).subscribe(response =>{
    //   console.log(response);
      
    // })
   
    // })  