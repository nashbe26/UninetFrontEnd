import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursServicesService {

  url:String="http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  addCours(id:any){
    return this.httpClient.post(`${this.url}addCours/`,id)
  }
  getCoursById(id:any){
    return this.httpClient.get(`${this.url}showCoursById/${id}`)
  }
  getGroup(id:any){
    return this.httpClient.get(`${this.url}showCours/${id}`);
  }
  deleteGroup(id:any){
    return this.httpClient.delete(`${this.url}deleteCours/${id}`)
  }
}
