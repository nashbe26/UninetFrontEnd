import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:String="http://localhost:3000";

  constructor(private httpClient:HttpClient) { }
  
  createUser(user:any){
    return this.httpClient.post(`${this.url}/login`,user)
  }
  findAll(){
    return this.httpClient.get(`${this.url}`)
  }
  findOne(userId:any){
    return this.httpClient.get(`${this.url}/${userId}`)
  }
  delete(userId:any){
    return this.httpClient.post(`${this.url}/delete/${userId}`,userId)
  }
  update(userId:any){
    return this.httpClient.put(`${this.url}/update/${userId}`,userId)
  }
}
