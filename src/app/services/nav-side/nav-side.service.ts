import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavSideService {

  constructor() { }
  toggleElm !: HTMLElement ;
  toggleMenu = (menu:HTMLDivElement,openClass:string,closeClass:string,rightWhenClosed:string) => {
    if (menu.classList.contains(openClass)) {
      menu.style.right = rightWhenClosed;
      menu.classList.remove(openClass);
      menu.classList.add(closeClass);
    } else {
      menu.classList.add(openClass);
      menu.classList.remove(closeClass);
      menu.style.right = `0px`;
    }
  };
  setToggleElm(elm:HTMLElement){
    this.toggleElm = elm;
  }
  getToggleElm(){
    console.log(this.toggleElm)
    return this.toggleElm;
    
  }
  
}
