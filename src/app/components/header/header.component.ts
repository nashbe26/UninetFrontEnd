import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
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
  messagesNot:any =[];
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
  lastId:any;
  getUser:any;
  CounterMessage:any=0;
  CounterNotifi:any=0;
  constructor(private websocket:WebsocketService,private notification:NotificationsService,private conversationServices:ConversationService,private userServices:UserService,private router:Router,private activatedRoutes:ActivatedRoute) { 
  }

  ngOnInit(): void {

    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if(event.url == "/"){
            this.onlineUser =""
            this.showSearch = false
            this.showUser = false;
            this.showNotification = false;
            this.showMessage = false;
          };    
      }else{
        if(JSON.parse(localStorage.getItem('user')!)!= null){
          this.onlineUser =JSON.parse(localStorage.getItem('user')!);
        }
      }
  });

  if(JSON.parse(localStorage.getItem('user')!)!= null){
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
      
    this.userServices.findOne(this.onlineUser._id).subscribe((data:any)=>{
      this.messages = data.conversation
      console.log(this.messages );
      
      this.messages.map((x:any,index:any)=>{
       this.conv.push(x.message);
       this.lastId= this.messages[index]._id
    })
  })
    this.websocket.getNotification().subscribe((notifcations:any)=>{
console.log(notifcations.notification.context );
        
        if(notifcations.notification.context == "sent a message"){
          if(this.messagesNot.length==0){
            this.CounterMessage++;
            this.messagesNot.unshift(notifcations)
          }
           this.messagesNot.map((x:any)=>{
             console.log(x.idUser == notifcations.idUser);
             if (x.idUser == notifcations.idUser){
              this.CounterNotifi++;

             }else{
              this.CounterMessage++;
             }
           })
          
        }else{
          this.counter++;
          this.notifications.unshift(notifcations)
        }
        if(this.notifications.length>5){
          this.notifications =        this.notifications.slice(0,5)

        }
    })
      
    this.notification.findAllByUser(this.onlineUser._id).subscribe(
      (notification:any)=>{
        this.notifications = notification.slice(0,5)
        console.log("notficaiton",notification);
        
      })}
  
}
 showToggleNotification(){
    this.showNotification = !this.showNotification
    this.showUser = false;
    this.showSearch = false;
    this.showMessage = false;
    this.counter = 0;
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

