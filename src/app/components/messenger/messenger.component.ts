import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { EventEmitter } from 'events';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  message:any=[];
  events:any = new EventEmitter()
  conversation:any;
  oneConversation:any
  id:any;
  constructor(private websocket:WebsocketService,private conversationServices:ConversationService,private  activatedRoutes :ActivatedRoute) { }
  ngOnInit(): void {
    this.websocket.event.on('receiveMessage',() => {
      this.message = this.websocket.messageRec
      console.log(this.message);
      this.conversationServices.getAllConversation().subscribe(response=>{
        this.conversation = response
      })
    this.id=this.activatedRoutes.snapshot.params['id']
    this.conversationServices.getOneConversation(this.id).subscribe(response =>{
      this.oneConversation=response
    })
    })  

  }
  onSubmit(){
    console.log(this.message)
    this.websocket.sendMessage(this.message)

  }

}
