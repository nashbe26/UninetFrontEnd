import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PostsService } from 'src/services/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm!:FormGroup;
  postStruct:any;
  onlineUser:any;
  constructor() {
    
   }

  ngOnInit(): void {


  }


}
