import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  url:String="http://localhost:3000/";
  constructor(private httpClient:HttpClient) { }
  createConversation(idOwner:any,idReceiver:any){
    return this.httpClient.post(`${this.url}createConversation`,{idOwner,idReceiver})
  }
  sendConversation(message:any){
    return this.httpClient.post(`${this.url}createConversation`,message)
  }
  deleteConversation(conversationId:any){
    return this.httpClient.post(`${this.url}deleteConversation/:id`,conversationId)
  }
  getAllConversation(){
    return this.httpClient.get(`${this.url}getAllConversation/:id`,)
  }
  getOneConversation(conversationId:any){
    return this.httpClient.get(`${this.url}getOneConversation/${conversationId}`,)
  }
}
