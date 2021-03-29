import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket:any
  users:any
  data:any
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
   
  }


    getOnlineUser() { 
      this.socket = io('http://localhost:3000')
      return new Promise((resolve, reject) => { 
        this.socket.on('userOnline', (data:any) => { 
          if (data.error) { 
            return reject(data.error); 
          } 
          this.data = data; 
          resolve(data);
         });
         }); 
    }
 
  }


