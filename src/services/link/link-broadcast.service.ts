import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkBroadcastService {

  url:String="http://localhost:3000/";

  constructor(private httpClient:HttpClient) { }

  createLink(link:any){
   return this.httpClient.post(`${this.url}link`,link)
  }
  showLinks(id:any){
    return this.httpClient.get(`${this.url}link/${id}`)
  }

}
