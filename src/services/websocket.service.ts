import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import {  Observable } from 'rxjs';
import { io } from 'socket.io-client'
declare const window: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  mediaDevices:any;
  socketId:any;
  socket:any
  users:any = []
  onlineUser:any = []
  messageRec:any =[]
  event = new EventEmitter()
  peerConnections:any = [];
  videoElement:any;
  peerConnection:any;
  video:any;
  config:any;
  secPeerConnection:any
  constructor() {
  console.log(localStorage.getItem("token"))
  this.connect(localStorage.getItem("token")!)
  }
  connect(jwtToken:any){
    this.socket = io('http://localhost:3000',{
      extraHeaders:{
        Authorization:`Bearer ${jwtToken}`,
        origins:"*"
      },
      
    })
    
    this.socket.on('connect', () => {
      this.receiveMessage();
      this.getOnlineUser();
      this.getSocketId();
      this.getNotification()
    })

  }
  getOnlineUser(){ 
    let observable = new Observable (observe =>{
      this.socket.on('userOnline', (data:any) => { 
        this.onlineUser.push(data.onlineUser) ; 
        this.users = data.users; 
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

    getNotification(){
      let observable = new Observable( observe =>{
        this.socket.on('notificationDetected',(data:any)=>{
          console.log(data);
          
          observe.next(data);
        })
      }) 
      return observable
    }
      
    
    receiveMessage(){
      let observable = new Observable(observe =>{
          this.socket.on('receiveMessage',(data:any)=>{
          observe.next(data.checkConv)
      })
    })
    return observable
  }

    getSocketId(){
      let observable = new Observable( observe =>{
      this.socket.on('userRoom',(id:any) => {
        observe.next(id);
      });
    });
    return observable
    }
    
  broadcast(){
    this.mediaDevices = navigator.mediaDevices as any;
    this.videoElement = (<HTMLVideoElement>document.querySelector('#video'));
      const config = {
        iceServers: [
          { 
            "urls": "stun:stun.l.google.com:19302",
          }
        ]
    };
    this.socket.on("watcher", (id:any) => {
      const peerConnection = new RTCPeerConnection(config);
      console.log(peerConnection);
      this.peerConnections[id] = peerConnection;
      let stream =(<MediaStream> this.videoElement.srcObject);
      (<MediaStream> this.videoElement.srcObject).getTracks().forEach(
        (track:any) => 
        peerConnection.addTrack(track, stream)
        );
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          this.socket.emit("candidate", id, event.candidate);
        }};
      peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          this.socket.emit("offer", id, peerConnection.localDescription);
        });
    });
    this.socket.on("candidate", (id:any, candidate:any) => {
      console.log(this.peerConnections[id]);
      console.log(candidate);
      
      this.peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });
    this.socket.on("answer", (id:any, description:any) => {
      
    this.peerConnections[id].setRemoteDescription(description);
    });
    this.socket.on("disconnectPeer", (id:any) => {
      this.peerConnections[id].close();
      delete this.peerConnections[id];
    });
    
    this.getStream();
}
async getStream(){
  if (window.stream) {
    window.stream.getTracks().forEach((track:any) => {
      track.stop();
    });
  }
  const constraints = {
    audio: true,
    video: true
  };
  const mediaDevices = navigator.mediaDevices as any;
  
  const stream = await mediaDevices.getDisplayMedia().then((data:any )=>{
  this.socket.emit("broadcaster");
  window.stream = data;
  (<HTMLVideoElement>document.querySelector('#video')!).srcObject = data;
})
.catch((e:any) =>{
  console.log(e);
});


  return stream
}
getUuid(Uuid:any){
  this.socket.emit('getUuid',Uuid)
}
viewer(){
  this.mediaDevices = navigator.mediaDevices as any;
  this.config = {
    iceServers: [
        { 
          "urls": "stun:stun.l.google.com:19302",
        }
    ]
  };
  
  this.socket.on("offer", (id:any, description:any) => {

    console.log(description,'description');
    
    const peerConnection  = new RTCPeerConnection(this.config);
    this.secPeerConnection = peerConnection;
    peerConnection
      .setRemoteDescription(description)
      .then(() => peerConnection.createAnswer())
      .then((sdp:any) => {
      return peerConnection.setLocalDescription(sdp)})
      .then(() => {
        this.socket.emit("answer", id, peerConnection.localDescription);
      });
    peerConnection.ontrack = (event:any) => {
      let videoElement = (<HTMLVideoElement>document.querySelector('#video'));
      videoElement.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = (event:any )=> {
     
      if (event.candidate) {
        this.socket.emit("candidate", id, event.candidate);
      }
    };
  });
  this.socket.on("candidate", (id:any, candidate:any) => {
    this.secPeerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .then(()=>{console.log("new user join the room",candidate)})
      .catch((e:any) => console.error(e));
  });
  this.socket.on("broadcaster", () => {
    this.socket.emit("watcher");
  });
  this.socket.on('connect',()=>{
        this.socket.emit("watcher");
  })
}
}

  

