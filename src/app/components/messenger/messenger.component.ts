import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {
  message:any=[];
  events:any = new EventEmitter()
  constructor(private websocket:WebsocketService) { }

  ngOnInit(): void {
    this.websocket.event.on('receiveMessage',() => {
      this.message = this.websocket.messageRec
      console.log(this.message);
      
    })  
  }
  onSubmit(){
    console.log(this.message)
    this.websocket.sendMessage(this.message)

  }
}
