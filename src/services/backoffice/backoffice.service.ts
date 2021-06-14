import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {

  url:String="http://localhost:3000";

  constructor(private httpClient:HttpClient) { }
 
  findAll(){
    return this.httpClient.get<any[]>(`${this.url}/getAllUser`);
  }
  findOne(userId:any){
    return this.httpClient.get<any[]>(`${this.url}/dashboard/${userId}`);
  }
  delete(userId:any){
    return this.httpClient.post(`${this.url}/delete/${userId}`,userId);
  }
  approuveUser(userId:any){
    console.log(userId);
    return this.httpClient.get(`${this.url}/approuveUser/${userId}`);
  }
  approuveCours(userId:any){
    console.log(userId);
    return this.httpClient.get(`${this.url}/approuveCours/${userId}`);
  }
  getAllCours(){
        return this.httpClient.get(`${this.url}/getAllCours`);
  }
}
