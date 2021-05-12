import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  url:String="http://localhost:3000/";

  constructor(private httpClient:HttpClient) { }
  
 
  findAll(notifId:any){
    return this.httpClient.get(`${this.url}notification/${notifId}`)
  }
  findAllByUser(userId:any){
    return this.httpClient.get(`${this.url}notification/user/${userId}`)
  }
  deleteNotification(notifId:any){
    return this.httpClient.delete(`${this.url}deleteNotification/${notifId}`,notifId)
  }
}