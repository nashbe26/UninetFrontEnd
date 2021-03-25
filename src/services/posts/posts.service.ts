import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  createPost(posts:any){
    return this.httpClient.post(`${this.url}`,posts);
  }
  findOne(postsId:any){
    return this.httpClient.get(`${this.url}/${postsId}`);
  }
  findAll(){
    return this.httpClient.get(`${this.url}`);
  }
  deletePost(postId:any){
    return this.httpClient.delete(`${this.url}/${postId}`)
  }
  updatePost(postId:any,posts:any){
    return this.httpClient.put(`${this.url}/${postId}`,posts)
  }
  
}
