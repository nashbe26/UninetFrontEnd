import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentGroupService {

  url:String="http://localhost:3000/";

  constructor(private httpClient:HttpClient) { }
  sendComment(comments:any){
    return this.httpClient.post(`${this.url}sendCommentGroup`,comments);
  }
  findOneComment(idComment:any){
    return this.httpClient.get(`${this.url}getonecommentsGroup/${idComment}`)

  }
  deleteComment(commentsId:any){
    return this.httpClient.delete(`${this.url}deletecommentGroup/${commentsId}`)
  }
  showComment(postId:any){
    return this.httpClient.get(`${this.url}getcommentsGroup/${postId}`)
  }
  updateComment(comment:any){
    return this.httpClient.get(`${this.url}updatecomment`,comment)
  }
}
