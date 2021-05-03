import { Comment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentsService } from 'src/services/comments/comments.service';
import { PostsService } from 'src/services/posts/posts.service';

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
  allPost:any;
  allComments:any;
  comment:any;
  commentForm!:FormGroup;
  commentId:any;
  postForm!:FormGroup;
  postStruct:any;
  newPost:any;
  newFile:any = null;
  constructor(private postsService:PostsService,private CommentsService:CommentsService) { }
  ngOnInit(): void {
    this.onlineUser = JSON.parse(localStorage.getItem('user')!)
    this.commentForm = new FormGroup({
      commentUser : new FormControl()
    })

    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl()
    })
    this.postsService.findAll().subscribe((data:any)=>{
      this.allPost=data
    })
    this.postsService.findAll().subscribe((data:any)=>{
        
      data.map((post:any)=>{
       if(post.user._id == this.onlineUser._id)
        this.showDeletePost = true;
      })
    })
    this.CommentsService.showComment(  this.onlineUser._id).subscribe((comments:any)=>{
      this.allComments = comments
    })
    this.getPostsIntervall()
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
        this.newPost=data
        this.allPost.unshift(data);
    
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
  onUpdate(commentId:any){
    this.CommentsService.updateComment(commentId).subscribe((comments:any)=>{
      console.log(comments);
      
    })
  }
}
