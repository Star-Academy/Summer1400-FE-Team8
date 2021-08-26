import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token, LoginFormData, UserFormData, Song } from '../../interfaces/interfaces';

const API = 'https://songs.code-star.ir';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  postLoginData(data: LoginFormData, endpoint: string): Observable<Token> {
    return this.http.post<Token>(`${API}/${endpoint}`, data, httpOptions);
  }

  postSignupData(data: UserFormData, endpoint: string): Observable<Token> {
    return this.http.post<Token>(`${API}/${endpoint}`, data, httpOptions);
  }

  getUserData(endpoint: string): Observable<Object> {
    return this.http.get<Object>(`${API}/${endpoint}`);
  }

  editUserData(data: UserFormData, token: string): Observable<Token> {
    return this.http.post<Token>(`${API}/user/alter`, data, httpOptions);
  }
}
