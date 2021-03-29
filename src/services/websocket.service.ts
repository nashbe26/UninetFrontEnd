import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { io } from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any
  users:any = []
  data:any
  messageRec:any =[]
  event = new EventEmitter()
  constructor() {
  console.log(localStorage.getItem("token"))
  this.connect(localStorage.getItem("token")!)
  }
  connect(jwtToken:any){
    this.socket = io('http://localhost:3000',{
      extraHeaders:{
        Authorization:`Bearer ${jwtToken}`
      }
    })
    
    this.socket.on('connect', () => console.log(jwtToken))
    this.getOnlineUser()
    this.receiveMessage()
  }


    getOnlineUser() { 
        this.socket.on('userOnline', (data:any) => { 
          this.users = data; 
          this.event.emit('ConnectionChanges')
         });
    }
    sendMessage(message:any){
      console.log('this from socket', message)
      this.socket.emit('newDisscu',{
        message
      })
    }
    receiveMessage(){
      this.socket.on('receiveMessage',(data:any)=>{
        this.messageRec = data
        console.log(this.messageRec)
      })
    }
 
  }


