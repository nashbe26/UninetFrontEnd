import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }
 showNotification(){
  let notification = document.getElementById('notification-area');
  if(notification){
    if ( notification.scrollHeight != 0) {
      notification.style.display="none";
    }else if (notification && notification.style.display == "none") {
        notification.style.display="block";
      }
    }
    console.log('nashbe')
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

