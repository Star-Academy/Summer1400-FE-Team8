import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavSideService {
  constructor() {}
  toggleElm!: HTMLElement;
  menu: any;
  black_page: any;
  openClass: any;
  closeClass: any;
  rightWhenClosed: any;

  toggleMenu = (menu: HTMLDivElement, openClass: string, closeClass: string, rightWhenClosed: string) => {
    if (menu.classList.contains(openClass)) {
      menu.style.right = rightWhenClosed;
      menu.classList.remove(openClass);
      menu.classList.add(closeClass);
    } else {
      menu.classList.add(openClass);
      menu.classList.remove(closeClass);
      menu.style.right = `0`;
    }
  };
  handleToggleMove() {}
  setNavMobileElms(menu: any, black_page: any, openClass: any, closeClass: any, rightWhenClosed: any) {
    this.menu = menu;
    this.black_page = black_page;
    this.openClass = openClass;
    this.closeClass = closeClass;
    this.rightWhenClosed = rightWhenClosed;
  }
  getNavMobileElms() {
    return {
      menu: this.menu,
      black_page: this.black_page,
      openClass: this.openClass,
      closeClass: this.closeClass,
      rightWhenClosed: this.rightWhenClosed,
    };
  }
  toggleBlackPage(menu: HTMLDivElement, black_page: HTMLDivElement, openClass: string) {
    if (menu.classList.contains(openClass)) {
      console.log(black_page)
      black_page.classList.add('display-none')
      black_page.classList.remove('display-block')
    } else {
      black_page.classList.add('display-block')
      black_page.classList.remove('display-none')
    }
  }
}
