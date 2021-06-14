import { Component, Input, OnInit } from '@angular/core';
import { WebsocketService } from 'src/services/websocket.service';
import { Guid } from 'guid-typescript';
import { LinkBroadcastService } from 'src/services/link/link-broadcast.service';
import { ActivatedRoute } from '@angular/router';
import { FeedUserService } from 'src/services/feedUser/feed-user.service';
import { CommentsService } from 'src/services/comments/comments.service';
import { PostsService } from 'src/services/posts/posts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpvotesService } from 'src/services/upvotes-services/upvotes.service';
import { UserService } from 'src/services/userService/user.service';
import { NgwWowService } from 'ngx-wow';
import { CoursServicesService } from 'src/services/coursServices/cours-services.service';
import { GroupService } from 'src/services/group/group.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  idBroadcast:any;
  userToken:any
  liveSession:any;
  gid: any;
  onlineUser:any;
  links:any;
  param1:any;
  id:any;
  userFeeds:any;
  showBox:boolean=false;
  showDeletePost:any;
  checkedId:any=[];

  @Input() allPost:any;
  allComments:any;
  comment:any;
  commentForm!:FormGroup;
  coursForm!:FormGroup;
  addForm!:FormGroup;
  commentId:any;
  postForm!:FormGroup;
  postStruct:any;
  newPost:any;
  newFile:any = null;
  err:any;
  upvotes:any;
  profilOwner:any;
  newdata:any;
  constructor(private groupService:GroupService,private frmbuilder:FormBuilder,private coursServices:CoursServicesService,private wowServices :NgwWowService,private websocket:WebsocketService,private route: ActivatedRoute,private linkServices:LinkBroadcastService,private userFeed:FeedUserService,private CommentsService:CommentsService,private userServices:UserService,private postsService:PostsService,private upvoteServices:UpvotesService) {
  }

  ngOnInit(): void {

    this.userToken = localStorage.getItem("token");
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    this.id= this.route.snapshot.params.id;
    this.getUserFeed(this.id)
    this.userServices.findOne(this.id).subscribe((data:any)=>{
      this.profilOwner = data
      console.log(this.profilOwner );
      
    })
    this.commentForm = new FormGroup({
      commentUser : new FormControl()
    })
    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl()
    })
   
    this.CommentsService.showComment(  this.onlineUser._id).subscribe((comments:any)=>{
      this.allComments = comments
    })
    this.route.params.subscribe(
      params => {
        console.log(params.id);
        
          const id = params.id
          this.getUserFeed(id)
          
      }
  );
  this.addForm=this.frmbuilder.group({   
    nomGroup:['',[Validators.required,Validators.minLength(3)]], 
    
 
  }); 
 
  // this.wowServices.init()
  }
  onSubmitCours(){
    this.coursForm.value.userId =this.onlineUser._id;
    this.coursServices.addCours(  this.coursForm.value).subscribe((data:any)=>{
      console.log("cours aded",data);
      
    })
    
  }
   onSubmit1(){
    if(this.postForm.value.userFile!=null){
      this.newFile = this.postForm.value.userFile.replace('C:\\fakepath\\','');
    }
     this.postStruct = {
       content:this.postForm.value.userPost,
       date:new Date(),
       user:this.onlineUser._id,
       src:this.newFile
     }
     this.postsService.createPost(this.postStruct).subscribe((data:any)=>{
        console.log(data)
        this.newPost=data
        this.allPost.unshift(data);
     })
   }

  onSend(id:any){
  
    this.commentId = id;
    this.CommentsService.showComment(id).subscribe((comments:any)=>{
      this.allComments = comments
    })
  }
  onUpvote(id:any){
    this.upvotes={
      userId:this.onlineUser._id,
      postId:id,
      createdAt:Date()
    }
    this.upvoteServices.sendUpvote(this.upvotes).subscribe((fdata:any)=>{
      this.upvoteServices.showUpvote(id).subscribe((data:any)=>{
        this.upvotes = data
      })
      console.log(this.upvotes);
      
    })
  }
  onSubmit(idPost:any){
    this.comment ={
      postId:this.commentId ,
      userId:this.onlineUser._id,
      commentContent:this.commentForm.value.commentUser,
      dateComment:Date()
    }
    this.CommentsService.sendComment(this.comment).subscribe((comments:any)=>{
      this.CommentsService.findOneComment(comments._id).subscribe((data:any)=>{
        this.allComments.unshift(data)
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
    })
  }
  onUpdate(commentId:any){
    this.CommentsService.updateComment(commentId).subscribe((comments:any)=>{
      console.log(comments);
      
    })
  }

  goToStream(){

    this.linkServices.showLinks(this.onlineUser._id).subscribe((results:any)=>{
      this.links=results
      console.log(results);
      
    })
  }
  joinLive(id:any){
    this.websocket.getUuid( id)
  }
  createLive(){
    this.gid = Guid.create();
    console.log("this.gid",this.gid.value);
    this.liveSession ={
      id:this.onlineUser._id,
      gid:this.gid.value,
      date:new Date(),
      url:`http://localhost:4200/broadcast/${this.gid}`
    }
    this.linkServices.createLink(this.liveSession).subscribe((data:any)=>{
      console.log('link added');
    })
  }
  getUserFeed(id:any){
    this.userFeed.getAllUserFeed(id).subscribe((data:any)=>{
      this.userFeeds = data
      console.log(data);
      
    })
  }
  onSubmit2(){
    this.addForm.value.admin = this.onlineUser._id;
    this.addForm.value.createdDate = Date.now;
    this.groupService.createGroup(this.addForm.value).subscribe((data:any)=>{
      this.newdata = data
      
    })
  }
}
