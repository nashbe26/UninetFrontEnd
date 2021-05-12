import { HttpErrorResponse } from '@angular/common/http';
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
  err:any;
  constructor(private publicEntity:PublicEntitiesService, private websocket:WebsocketService,private postsService:PostsService,private router:Router) { 


  }

ngOnInit():void {

    this.websocket.getOnlineUser().subscribe((data:any) =>{
      this.users= data;
    },(err:any)=>{
      if (this.err instanceof HttpErrorResponse){
        if (this.err.status===401){
          this.router.navigate(['/'])
        }
      }
    })
    this.showPopUp = this.publicEntity.showPopUp
  }
}
