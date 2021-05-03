import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url:String="http://localhost:3000/";
  constructor(private httpClient:HttpClient) { }
  sendComment(comments:any){
    return this.httpClient.post(`${this.url}sendComment`,comments);
  }
  findOneComment(idComment:any){
    return this.httpClient.get(`${this.url}getonecomments/${idComment}`)

  }
  deleteComment(commentsId:any){
    return this.httpClient.delete(`${this.url}deletecomment/${commentsId}`)
  }
  showComment(postId:any){
    return this.httpClient.get(`${this.url}getcomments/${postId}`)
  }
  updateComment(comment:any){
    return this.httpClient.get(`${this.url}updatecomment`,comment)
  }
}
