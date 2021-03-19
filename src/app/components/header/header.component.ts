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
public showNotification(){
  let notification = document.getElementById('notification-area');
  if(notification){
    if ( notification.scrollHeight != 0) {
      
      notification.style.display="none";
      console.log('twitter')
    }else if (notification && notification.style.display == "none") {
        notification.style.display="block";
        console.log('twitter')

      }
    }
    console.log('nashbe')
  }
}

