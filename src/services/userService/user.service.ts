import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:String="http://localhost:3000";

  constructor(private httpClient:HttpClient) { }
  
  createUser(user:any){
    console.log(user)
    return this.httpClient.post(`${this.url}/login`,user)
  }
  findAll(){
    return this.httpClient.get(`${this.url}`)
  }
  findOne(userId:any){
    return this.httpClient.get(`${this.url}/${userId}`)
  }
  delete(userId:any){
    return this.httpClient.get(`${this.url}/delete/${userId}`)
  }
  update(userId:any,user:any){
    return this.httpClient.get(`${this.url}/update/${userId}`)
  }
}
