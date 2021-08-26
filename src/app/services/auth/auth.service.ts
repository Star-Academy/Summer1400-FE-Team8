import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  };

  getToken = () => {
    return localStorage.getItem('token') || null;
  };

  checkExpiry = () => {
    return new Date(localStorage.getItem('expiry') as any) > new Date();
  };

  setExpiry = (date: Date) => {
    const expiry = new Date(date.getTime() + 10 * 86400000);
    localStorage.setItem('expiry', expiry as any);
  };

  removeUserLocal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  setUserLocal = (token: string, user: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  isLogged = () => {
    return this.getToken() ? true : false;
  };
}
