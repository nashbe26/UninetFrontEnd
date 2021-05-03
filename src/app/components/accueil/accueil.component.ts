import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/services/posts/posts.service';
import { WebsocketService } from 'src/services/websocket.service';
import { PublicEntitiesService } from '../public-entities.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  showPopUp:any;
  postForm!:FormGroup;
  onlineUser:any;
  postStruct:any;
  users:any;
  newFile:any = null;
  allPost:any;
  showDeletePost:any;
  constructor(private publicEntity:PublicEntitiesService, private websocket:WebsocketService,private postsService:PostsService) { 


  }

  ngOnInit():void {
    console.log('salem');
    
     
    this.websocket.getOnlineUser().subscribe((data:any) =>{
      this.users= data;
    
    })
    this.showPopUp = this.publicEntity.showPopUp
  }

 


}
