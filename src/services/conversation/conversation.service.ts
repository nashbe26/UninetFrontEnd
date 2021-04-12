import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  url:String="http://localhost:3000/";
  constructor(private httpClient:HttpClient) { }
  sendConversation(conversation:any){
    return this.httpClient.post(`${this.url}sendConversation`,conversation)
  }
  createConversation(users:any){
    return this.httpClient.post(`${this.url}createConversation`,users)
  }
 
  deleteConversation(conversationId:any){
    return this.httpClient.post(`${this.url}deleteConversation/:id`,conversationId)
  }
  getAllConversation(){
    return this.httpClient.get(`${this.url}getAllConversation`,)
  }
  getOneConversation(conversationId:any){    
    return this.httpClient.get(`${this.url}getOneConversation/${conversationId}`,)
  }
  getOneSpecConversation(conversationId:any){    
    return this.httpClient.get(`${this.url}getOneConversationPopUp/${conversationId}`,)
  }
}
