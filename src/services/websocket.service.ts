import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any

  constructor() {
  }
  connect(jwtToken:any){
    this.socket = io('http://localhost:3000',{
      extraHeaders:{
        Authorization:`Bearer ${jwtToken}`
      }
    })
    this.socket.on('connect', () => console.log(jwtToken))
  }



}
