import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpvotesService {

  url:String="http://localhost:3000/";
  constructor(private httpClient:HttpClient) { }
  sendUpvote(comments:any){
    return this.httpClient.post(`${this.url}addupvote`,comments);
  }
  findUpvote(idComment:any){
    return this.httpClient.get(`${this.url}showupvote/${idComment}`)
  }
  deleteUpvote(commentsId:any){
    return this.httpClient.delete(`${this.url}deleteupvote/${commentsId}`)
  }
  showUpvote(postId:any){
    return this.httpClient.get(`${this.url}showOneupvote/${postId}`)
  }
  // updateComment(comment:any){
  //   return this.httpClient.get(`${this.url}updatecomment`,comment)
  // }
}