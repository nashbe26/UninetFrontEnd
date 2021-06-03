import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client'
import { UserService } from 'src/services/userService/user.service';
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
  newUser:any;
  constructor(private websocket:WebsocketService,private userServices:UserService) {
   
  }

  ngOnInit(): void {
    this.userServices.findAll().subscribe((data:any)=>{
      this.newUser = data
    })
    this.idOnline =JSON.parse(localStorage.getItem('user')!);
    this.websocket.broadcast()
  } 
 
  }
