import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import {Token , LoginFormData , SignupFormData , Song} from '../../interfaces/interfaces'


const httpOptions = {
  headers : new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AsyncService {

  constructor(private http:HttpClient) { }

  private API = 'https://songs.code-star.ir';

  postLoginData(data:LoginFormData,endpoint:string):Observable<Token>{
    return this.http.post<Token>(`${this.API}/${endpoint}`,data,httpOptions)
  }
  
  postSignupData(data:SignupFormData,endpoint:string):Observable<Token>{
    return this.http.post<Token>(`${this.API}/${endpoint}`,data,httpOptions)
  }

  getData(endpoint:string):Observable<Object>{
    return this.http.get<Object>(`${this.API}/${endpoint}`)
  }

  

}
