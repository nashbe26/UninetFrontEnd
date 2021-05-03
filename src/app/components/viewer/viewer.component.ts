import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'
import { WebsocketService } from 'src/services/websocket.service';

declare const window: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  socket:any;
  mediaDevices:any;
  peerConnection:any;
  video:any;
  config:any;
  enableAudioButton:any;
  constructor(private websocket:WebsocketService) { }

  ngOnInit(): void {

    this.websocket.viewer();
  }
  
  
  }
  