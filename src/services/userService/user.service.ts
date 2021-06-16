import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:String="http://localhost:3000";

  constructor(private httpClient:HttpClient) { }
  getToken(){
    return localStorage.getItem('token')
  }
  createUser(user:any){
    console.log(user);
    return this.httpClient.post(`${this.url}/signup`,user);
   
  }
  loginUser(user:any){
    return this.httpClient.post(`${this.url}/login`,user);
  }
  findAll(){
    return this.httpClient.get<any[]>(`${this.url}/getAllUser`);
  }
  findOne(userId:any){
    return this.httpClient.get<any[]>(`${this.url}/dashboard/${userId}`);
  }
  delete(userId:any){
    return this.httpClient.post(`${this.url}/delete/${userId}`,userId);
  }
  update(userId:any){
    return this.httpClient.put(`${this.url}/update/${userId}`,userId);
  }
  fidnOneSerach(userId:any){
    return this.httpClient.get(`${this.url}/searchbyname/${userId}`);
  }
  getUserByclass(userId:any){
    
    return this.httpClient.post(`${this.url}/classRoom`,userId);
  }
}
