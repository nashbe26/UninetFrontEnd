import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeworkResponseService {

  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  addhomework(id:any){
    return this.httpClient.post(`${this.url}addhomeworkresponse/`,id)
  }
  getHomeworkByUserId(id:any){
    return this.httpClient.get(`${this.url}showhomeworkByIdresponse/${id}`)
  }
  gethomeworkById(id:any){
    return this.httpClient.get(`${this.url}showhomeworkresponse/${id}`);
  }
  deleteHomework(id:any){
    return this.httpClient.delete(`${this.url}deletehomeworkresponse/${id}`)
  }
}
