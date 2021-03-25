import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  url:String="http://localhost:3000/";

  constructor(private httpClient:HttpClient) { }
  
  createNotification(notif:any){
    return this.httpClient.post(`${this.url}`,notif)
  }
  findAll(){
    return this.httpClient.get(`${this.url}`)
  }
  deleteNotification(notifId:any){
    return this.httpClient.post(`${this.url}/notificaiton/${notifId}`,notifId)
  }
}