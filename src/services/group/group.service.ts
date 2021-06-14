import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  getGroupById(id:any){
    return this.httpClient.get(`${this.url}showGroupById/${id}`)
  }
  getGroup(id:any){
    return this.httpClient.get(`${this.url}showGroup/${id}`);
  }
  deleteGroup(id:any){
    return this.httpClient.delete(`${this.url}deleteGroup/${id}`)
  }
  createGroup(id:any){
    return this.httpClient.post(`${this.url}addgroup`,id)
  }
  addGroup(id:any){
    return this.httpClient.post(`${this.url}addStudent`,id)
  }
}
