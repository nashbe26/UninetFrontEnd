import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from 'src/services/websocket.service';
import { PublicEntitiesService } from '../public-entities.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  showPopUp:any;
  constructor(private publicEntity:PublicEntitiesService, private websocket:WebsocketService,private route:ActivatedRoute) { 
    route.params.subscribe(val => {
      console.log("nashbe");
      
      this.websocket.getOnlineUser().subscribe((data:any) =>{
        console.log(data);
        this.users= data;
        console.log( this.users);
      })
    });
  }
  users:any;
  ngOnInit(): void {
    this.showPopUp = this.publicEntity.showPopUp
  }
  getOnlineUsers(){
  
  }
}
