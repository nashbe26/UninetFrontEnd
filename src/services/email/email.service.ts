import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }

  sendEmail(id:any){
    return this.httpClient.post(`${this.url}sendEmail/`,id)
  }
}
