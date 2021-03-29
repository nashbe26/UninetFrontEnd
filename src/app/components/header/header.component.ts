import { Component, OnInit } from '@angular/core';
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
  constructor(private websocket:WebsocketService) { 
  }

  ngOnInit(): void {

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

