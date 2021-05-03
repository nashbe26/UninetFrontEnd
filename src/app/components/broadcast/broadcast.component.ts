import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'
import { WebsocketService } from 'src/services/websocket.service';
declare const window: any;

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent implements OnInit {
  numberUser= [];
  socket :any;
  peerConnections :any;
  videoElement:any;
  mediaDevices:any;
  idOnline:any;
  constructor(private websocket:WebsocketService) {
   
  }

  ngOnInit(): void {

    this.idOnline =JSON.parse(localStorage.getItem('user')!);
    this.websocket.broadcast()
  } 
 
  }
