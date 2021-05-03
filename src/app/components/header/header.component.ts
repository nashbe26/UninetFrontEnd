import { Component, OnInit } from '@angular/core';
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
  constructor(private websocket:WebsocketService,private notification:NotificationsService,private conversationServices:ConversationService,private userServices:UserService) { 
  }

  ngOnInit(): void {
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);

    this.notification.findAll(this.onlineUser._id).subscribe(
      (notification:any)=>{
        this.notifications = notification
        console.log(this.notifications);
        
      })
    this.userServices.findOne(this.onlineUser._id).subscribe((data:any)=>{
      this.messages = data.conversation
      console.log( this.messages);
      
    })
  
    this.websocket.getNotification().subscribe((notifcations:any)=>{
      console.log("notifcation",notifcations);
      this.notifications.push(notifcations)
      console.log("dsqdsqd",this.notification);
    })
  }
 showToggleNotification(){
    this.showNotification = !this.showNotification
    this.showUser = false;
    this.showSearch = false;
    }
    showToggleSearch(){
      this.showSearch = !this.showSearch
      this.showUser = false;
      this.showNotification = false;
      }
      showToggleUser(){
        this.showUser = !this.showUser
        this.showNotification = false;
        this.showSearch = false;
        }
        
//   showProfile(){
//     let userProfile = document.getElementById('user-area');
//     if(userProfile){
//       if ( userProfile.style.display= "block") {
//         userProfile.style.display="none";
//       }else if (userProfile && userProfile.style.display == "none") {
//         userProfile.style.display="block";
//         }
//       }
//       console.log('nashbe')
//     }
}

