import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { EventEmitter } from 'events';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/services/userService/user.service';

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
  messages:any;
  conv:any;
  results:any=[];
  constructor(private websocket:WebsocketService,private conversationServices:ConversationService,private userServices:UserService,private  activatedRoutes :ActivatedRoute,private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message:['']
    })
    this.id=this.activatedRoutes.snapshot.params['id']
    this.idOnline =JSON.parse(localStorage.getItem('user')!);

    this.conversationServices.getOneConversation(this.id).subscribe( results =>{
      this.newMessage= results;

      console.log(results);
    })
    this.websocket.event.on('MessageChanges',() => {      
      
      console.log("sqdsq",this.newMessage);
    })
    this.userServices.findOne(this.idOnline._id).subscribe((data:any)=>{
      this.results = data.conversation
      
      
      // data.conversation.map((x:any)=>{
      //   this.results.push(x)
      //   console.log(this.results);
      // })
  
    })
  
  }
  onSubmit(){
    this.conversationId = {
      _id:this.id,
      users:[this.idOnline._id,this.id],
      message:{content:this.message}
    }
    this.websocket.sendMessage(this.conversationId)
    this.websocket.receiveMessage().subscribe((data:any) =>{
      this.newMessage= data;
      this.userServices.findOne(this.idOnline._id).subscribe((data:any)=>{
        this.results = data.conversation    
      })
 
    })
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