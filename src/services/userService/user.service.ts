import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:String="http://localhost:3000";

  constructor(private httpClient:HttpClient) { }
  private _refreshNeeded = new Subject <void>();
  get refreshNeeded$(){
    return this._refreshNeeded
  }
  createUser(user:any){
    return this.httpClient.post(`${this.url}/login`,user).pipe(tap(()=>{
        this._refreshNeeded.next()
      })
    )
  }
  findAll(){
    return this.httpClient.get<any[]>(`${this.url}/getAllUser`)
  }
  findOne(userId:any){
    return this.httpClient.get<any[]>(`${this.url}/dashboard/${userId}`)
  }
  delete(userId:any){
    return this.httpClient.post(`${this.url}/delete/${userId}`,userId)
  }
  update(userId:any){
    return this.httpClient.put(`${this.url}/update/${userId}`,userId)
  }
}
