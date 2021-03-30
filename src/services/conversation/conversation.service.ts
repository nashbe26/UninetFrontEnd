import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  url:String="http://localhost:3000/";
  constructor(private httpClient:HttpClient) { }
  createConversation(conversationIDOwner:any,conversationIdReciever:any){
    return this.httpClient.post(`${this.url}/:id/createConversation`,{conversationIDOwner,conversationIdReciever})
  }
  deleteConversation(conversationId:any){
    return this.httpClient.post(`${this.url}/:id/deleteConversation`,conversationId)
  }
  getAllConversation(){
    return this.httpClient.get(`${this.url}/:id/getAllConversation`,)
  }
  getOneConversation(conversationId:any){
    return this.httpClient.get(`${this.url}/:id/getOneConversation/${conversationId}`,)
  }
}
