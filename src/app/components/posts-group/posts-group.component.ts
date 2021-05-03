import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/services/comments/comments.service';
import { GroupService } from 'src/services/group/group.service';
import { PostsGroupService } from 'src/services/group/posts-group.service';
import { PostsService } from 'src/services/posts/posts.service';

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
  postStruct:any;
  newPost:any;
  newFile:any = null;
  constructor(private  activatedRoutes :ActivatedRoute,private groupeServices:GroupService,private postsService:PostsGroupService,private CommentsService:CommentsService) { }

  ngOnInit(): void {
    this.id=this.activatedRoutes.snapshot.params['id']
    console.log(this.id);
    this.onlineUser =JSON.parse(localStorage.getItem('user')!);

    this.groupeServices.getGroup(this.id).subscribe((groups:any)=>{
      this.group = groups
     this.allPost = this.group.posts;
     
      
    })
    this.postForm = new FormGroup({
      userPost :new FormControl(),
      userFile :new FormControl()
    })
    this.commentForm = new FormGroup({
      commentUser : new FormControl()
    })
   
  }
 
  onSubmit1(){
    if(this.postForm.value.userFile!=null){
      this.newFile = this.postForm.value.userFile.replace('C:\\fakepath\\','');
    }
     this.postStruct = {
       groupId:this.id,
       content:this.postForm.value.userPost,
       date:new Date(),
       user:this.onlineUser._id,
       src:this.newFile
     }
     this.postsService.createPost(this.postStruct).subscribe((data:any)=>{
        this.newPost=data
        console.log("this",this.newPost);
        
      this.postsService.findOne(this.newPost._id).subscribe((datas:any)=>{
        console.log("this.newPost",datas);
        
        this.allPost.unshift(datas);
      })
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
