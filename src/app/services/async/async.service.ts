import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';

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

  postData(data:Object,endpoint:string):Observable<Object>{
    return this.http.post<Object>(`${this.API}/${endpoint}`,data,httpOptions)
  }

}
