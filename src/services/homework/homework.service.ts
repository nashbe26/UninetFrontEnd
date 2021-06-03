import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  addhomework(id:any){
    return this.httpClient.post(`${this.url}addhomework/`,id)
  }
  getHomeworkByUserId(id:any){
    return this.httpClient.get(`${this.url}showhomeworkById/${id}`)
  }
  gethomeworkById(id:any){
    console.log(id);
    
    return this.httpClient.get(`${this.url}showhomework/${id}`);
  }
  deleteHomework(id:any){
    return this.httpClient.delete(`${this.url}deletehomework/${id}`)
  }
  checkUser(id:any,idHome:any){
    return this.httpClient.get(`${this.url}checkuser/${id}/${idHome}`)
  }
}
