import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { observable, Observable } from 'rxjs';
import { io } from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any
  users:any = []
  onlineUser:any = []
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
    this.socket.on('connect', () => {
      this.receiveMessage()
      this.getOnlineUser()
    })
    
    
  }
    getOnlineUser(){ 
      let observable = new Observable (observe =>{
        this.socket.on('userOnline', (data:any) => { 
          this.onlineUser.push(data.onlineUser) ; 
         
          this.users = data.users; 
          console.log("nashbe");
          
          observe.next(data.users)
         });
      })
     return observable
    }
    sendMessage(message:any){
      console.log('this from socket',  message)
      this.socket.emit('newDisscu',{  
        message
      })
    }
    receiveMessage(){
      let observable = new Observable(observe =>{
          this.socket.on('receiveMessage',(data:any)=>{
            console.log("from socket",data);
            observe.next(data.messages)
      })
    })
    return observable
  }
}


