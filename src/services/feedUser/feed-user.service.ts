import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedUserService {

  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  addUserFeed(posts:any){
    return this.httpClient.post(`${this.url}addUserFeed`,posts);
  }
  deleteUserFeed(postId:any){
    return this.httpClient.delete(`${this.url}deleteUserFeed/${postId}`)
  }
  getAllUserFeed(UserId:any){
    return this.httpClient.get(`${this.url}getUserFeed/${UserId}`)
  }
}
