import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from 'src/services/comments/comments.service';
import { GroupService } from 'src/services/group/group.service';
import { PostsGroupService } from 'src/services/group/posts-group.service';
import { LinkBroadcastService } from 'src/services/link/link-broadcast.service';
import { PostsService } from 'src/services/posts/posts.service';
import { UpvotesService } from 'src/services/upvotes-services/upvotes.service';
import { WebsocketService } from 'src/services/websocket.service';
import { Guid } from 'guid-typescript';
import { CoursServicesService } from 'src/services/coursServices/cours-services.service';

@Component({
  selector: 'app-posts-group',
  templateUrl: './posts-group.component.html',
  styleUrls: ['./posts-group.component.css']
})
export class PostsGroupComponent implements OnInit {
  id:any;
  group:any;
  showBox:boolean=false;
  showDeletePost:any;
  checkedId:any=[];
  onlineUser:any;
  allPost:any;
  allComments:any;
  comment:any;
  commentForm!:FormGroup;
  commentId:any;
  postForm!:FormGroup;
  addForm!:FormGroup;
  postStruct:any;
  newPost:any;
  newFile:any = null;
  images:any;
  imagepath:any;
  idBroadcast:any;
  userToken:any
  liveSession:any;
  gid: any;
  coursForm!:FormGroup;

  links:any;
  param1:any;

  userFeeds:any;
  
  cours:any
  err:any;
  upvotes:any;
  profilOwner:any;
  newdata:any;
  constructor( private router: Router,private coursServices:CoursServicesService,private frmbuilder:FormBuilder,private  activatedRoutes :ActivatedRoute,private groupeServices:GroupService,private postsService:PostsGroupService,private CommentsService:CommentsService,private httpClient:HttpClient,private upvoteServices:UpvotesService,private linkServices: LinkBroadcastService,private websocket :WebsocketService) { }

  ngOnInit(): void {
   
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);
    this.activatedRoutes.params.subscribe((params:any) => {
      this.id = params.id;
      this.groupeServices.getGroup(this.id).subscribe((groups:any)=>{
        this.group = groups
       this.allPost = this.group.posts;
       
        
      })
      this.coursServices.getCoursById(this.onlineUser._id).subscribe((cour:any)=>{
        this.cours = cour
       console.log(cour);
       
        
      })
    })

    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl()
    })
    this.coursForm = new FormGroup({
      cours :new FormControl(),
      date :new FormControl(),
      hours :new FormControl(),
      sessionStatus :new FormControl(),
    })
    this.commentForm = new FormGroup({
      commentUser : new FormControl()
    })
  
    this.addForm=this.frmbuilder.group({   
      filiere:['----------------------------------------',[Validators.required]], 
      niveau:['----------------------------------------',[Validators.required]], 
    }); 
   
  }
 
  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
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
      src:this.newFile,
      groupId:this.id 
    }
     this.postsService.createPost(this.postStruct).subscribe((data:any)=>{
        this.newPost=data
        this.allPost.unshift(data);
        console.log(data);
        
     })
   }

  getPostsIntervall(){
    setInterval(()=>{
      this.postsService.findAll().subscribe((data:any)=>{
        this.allPost=data
      })
    },2000)

  }
  onSend(id:any){
    this.commentId = id;
    this.CommentsService.showComment(id).subscribe((comments:any)=>{
      this.allComments = comments
    })
  }
  onSubmit2(){
    this
    this.addForm.value.group =  this.id 
    this.groupeServices.addGroup(this.addForm.value).subscribe((data:any)=>{
      console.log(data);
      
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
  onSubmitCours(){
    console.log(this.id);
    
    this.groupeServices.getGroup(this.id).subscribe((data:any)=>{
      console.log(data);
      
      this.coursForm.value.userId =this.onlineUser._id;
      this.coursForm.value.student = data.userId;
      this.coursServices.addCours(  this.coursForm.value).subscribe((data:any)=>{
        console.log("cours aded",data);
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
  onUpdate(commentId:any){
    this.CommentsService.updateComment(commentId).subscribe((comments:any)=>{
      console.log(comments);
      
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
 

 

  getLike(id:any){
    this.upvoteServices.showUpvote(id).subscribe((data:any)=>{
      this.upvotes = data
    })
  }
 

  goToStream(){

    this.linkServices.showLinks(this.onlineUser._id).subscribe((results:any)=>{
      this.links=results
      console.log(results);
      
    })
  }

  joinLive(){
    this.gid = Guid.create();
    console.log(this.gid);
    
    this.router.navigate(["./broadcast/", this.gid.value]);
  }

}


