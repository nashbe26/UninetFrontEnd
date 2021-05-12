import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationService } from 'src/services/conversation/conversation.service';
import { NotificationsService } from 'src/services/notifications/notifications.service';
import { UserService } from 'src/services/userService/user.service';
import { WebsocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users:any;
  showNotification : boolean =false;
  showUser : boolean =false;
  showSearch : boolean =false;
  notifications:any =[];
  onlineUser:any;
  conversation:any;
  oneUser:any;
  messages:any;
  conv:any=[];
  err:any;
  showMessage:any;
  results:any;
  counter:any=0;
  searchs:any;
  checkSearch:boolean = false;
  constructor(private websocket:WebsocketService,private notification:NotificationsService,private conversationServices:ConversationService,private userServices:UserService,private router:Router) { 
  }

  ngOnInit(): void {


 
    if(JSON.parse(localStorage.getItem('user')!)){
      this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    }

    this.userServices.findOne(this.onlineUser._id).subscribe((data:any)=>{
      this.messages = data.conversation
      
      this.messages.map((x:any)=>{
       this.conv.push(x.message);
    })
  })
    this.websocket.getNotification().subscribe((notifcations:any)=>{
        this.counter++;
        console.log(notifcations,"notifcationsnotifcationsnotifcationsnotifcations");
        
        this.notifications.unshift(notifcations)
    })
      
    this.notification.findAllByUser(this.onlineUser._id).subscribe(
      (notification:any)=>{
        this.notifications = notification.slice(0,5)
        console.log("notficaiton",notification);
        
      })
  }

 showToggleNotification(){
    this.showNotification = !this.showNotification
    this.showUser = false;
    this.showSearch = false;
    this.showMessage = false;
    }
    showToggleSearch(){
      this.showSearch = !this.showSearch
      this.showUser = false;
      this.showNotification = false;
      this.showMessage = false;
      }
      showToggleUser(){
        this.showUser = !this.showUser
        this.showNotification = false;
        this.showSearch = false;
        this.showMessage = false;
      }
      showToggleMessage(){
        this.showMessage = !this.showMessage
        this.showUser = false;
        this.showNotification = false;
        this.showSearch = false;
        }
        sendit(id:any){
          console.log(id.length);
          
          if(id.length>0)
          {
            this.userServices.fidnOneSerach(id).subscribe((data:any)=>{
              this.searchs =data;
              this.checkSearch = false;
             })
          }else{
            this.checkSearch = true;
            this.searchs =[];
        
          }
       
        }

}

