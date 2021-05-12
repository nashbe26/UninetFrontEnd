import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comment } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentsService } from 'src/services/comments/comments.service';
import { FeedUserService } from 'src/services/feedUser/feed-user.service';
import { PostsService } from 'src/services/posts/posts.service';
import { UpvotesService } from 'src/services/upvotes-services/upvotes.service';

@Component({
  selector: 'app-post-child',
  templateUrl: './post-child.component.html',
  styleUrls: ['./post-child.component.css']
})
export class PostChildComponent implements OnInit {
  showBox:boolean=false;
  showDeletePost:any;
  checkedId:any=[];
  onlineUser:any;
  @Input() allPost:any;
  allComments:any=[];
  comment:any;
  commentForm!:FormGroup;
  commentId:any;
  postForm!:FormGroup;
  postStruct:any;
  newPost:any;
  newFile:any = null;
  err:any;
  upvotes:any;
  upvoteLength:any;
  sharePost:any;
  check:boolean = false;
  spin:any;
  showSpinner:any;
  images:any;
  imagepath:any;
  constructor(private postsService:PostsService,private CommentsService:CommentsService,private upvoteServices:UpvotesService,private userFeed:FeedUserService,private httpClient:HttpClient) { }
  ngOnInit(): void {
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    this.commentForm = new FormGroup({
      commentUser : new FormControl()
    })
    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl()
    })
    this.showSpinner =true
    setTimeout(() => {
      this.postsService.findAll().subscribe((data:any)=>{
        this.showSpinner =false
        this.allPost=data       
      })
    }, 1000);
    this.CommentsService.showComment(  this.onlineUser._id).subscribe((comments:any)=>{
      this.allComments = comments
    })
  }
  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }



  onSubmitOne(){

  }
   onSubmit1(){
    if(this.postForm.value.userFile!=null){
      this.newFile = this.postForm.value.userFile.replace('C:\\fakepath\\','');
      const formData = new FormData();
      formData.append('file', this.images);
  
      this.httpClient.post<any>('http://localhost:3000/file', formData).subscribe(
        (res:any) => {
          console.log(res);
          
          this.imagepath = res.path
          console.log(this.imagepath );
          
        },
        (err:any) => console.log(err)
      );
 
  
    }
    this.postStruct = {
      content:this.postForm.value.userPost,
      date:new Date(),
      user:this.onlineUser._id,
      src:this.newFile
    }
     this.postsService.createPost(this.postStruct).subscribe((data:any)=>{
       console.log(data);
        this.newPost=data
        this.allPost.unshift(data);
     })
   }
  getPostsIntervall(){
    this.postsService.findAll().subscribe((data:any)=>{
      this.allPost=data
      
    })
  }

  
  onSend(id:any){
  
    this.commentId = id;
    this.CommentsService.showComment(id).subscribe((comments:any)=>{
      this.allComments = comments
      console.log("this.allComments",this.allComments);
      
    })
  }
  onUpvote(id:any){
    this.upvotes={
      userId:this.onlineUser._id,
      postId:id,
      createdAt:Date()
    }
    this.upvoteServices.sendUpvote(this.upvotes).subscribe((fdata:any)=>{
      this.check = fdata.value;
      this.getPostsIntervall()
    })
  }
  onSubmit(idPost:any){
    this.comment ={
      postId:this.commentId ,
      userId:this.onlineUser._id,
      commentContent:this.commentForm.value.commentUser,
      dateComment:Date()
    }
    this.spin = true;
    this.CommentsService.sendComment(this.comment).subscribe((comments:any)=>{
      this.CommentsService.findOneComment(comments._id).subscribe((data:any)=>{
        this.allComments.unshift(data);
        this.spin = false;
      })
    })
  }


  deletePost(id:any){
    this.postsService.deletePost(id).subscribe((posts:any)=>{
      this.allPost.map((x:any,index:any)=>{
        if(posts._id == x._id){
          this.allPost.splice(index,1);
        };
      })
    })
  }
  onDelete(commentId:any){
    console.log(commentId);
    
    this.CommentsService.deleteComment(commentId).subscribe((comments:any)=>{
      this.allComments.map((x:any,index:any)=>{
        if(comments._id == x._id){
          this.allComments.splice(index,1);
        };
      })
    })
  }
  getLike(id:any){
    this.upvoteServices.showUpvote(id).subscribe((data:any)=>{
      this.upvotes = data
      this.upvoteLength  = this.upvotes.legnth
    })
  }
  getShare(id:any){
    this.sharePost={
      userId:this.onlineUser._id,
      postId:id,
      createdAt:Date()
    }
    this.userFeed.addUserFeed(this.sharePost).subscribe((data:any)=>{
      
    },(err:any)=>{
      console.log(err);
      
    })
  }
  onUpdate(commentId:any){
    this.CommentsService.updateComment(commentId).subscribe((comments:any)=>{
      console.log(comments);
      
    })
  }
}
