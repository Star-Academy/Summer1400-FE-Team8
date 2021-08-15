import { Injectable } from '@angular/core';
// import { URLSearchParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  setParams(name:string,val:string,name2:string,val2:string){
    const state = window.location.search;
    const urlParams = new URLSearchParams(state);
    urlParams.set(name,val);
    if(name2){
      urlParams.set(name2,val2);
    }
    // window.location.search = urlParams;
  }
   getParams(name:string){
    const state = window.location.search;
    const urlParams = new URLSearchParams(state);
    return urlParams.get(name);
  }

}
