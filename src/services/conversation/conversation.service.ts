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
  createConversation(idOwner:any,idReceiver:any){
    return this.httpClient.post(`${this.url}createConversation`,{idOwner,idReceiver})
  }
 
  deleteConversation(conversationId:any){
    return this.httpClient.post(`${this.url}deleteConversation/:id`,conversationId)
  }
  getAllConversation(){
    return this.httpClient.get(`${this.url}getAllConversation`,)
  }
  getOneConversation(conversationId:any){
    console.log(conversationId);
    
    return this.httpClient.get(`${this.url}getOneConversation/${conversationId}`,)
  }
}
