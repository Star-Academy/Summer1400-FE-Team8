import { Component, OnInit } from '@angular/core';
import { NavSideService } from 'src/app/services/nav-side/nav-side.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AsyncService } from 'src/app/services/async/async.service';
import { Router , NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-nav-side-mobile',
  templateUrl: './nav-side-mobile.component.html',
  styleUrls: ['./nav-side-mobile.component.scss']
})
export class NavSideMobileComponent implements OnInit {

  constructor(private navSideService : NavSideService,
    private authService:AuthService , private router:Router , private asyncService : AsyncService) { }

    toggleBlackPage = (menu : HTMLDivElement,black_page : HTMLDivElement , openClass:string) => {
      if (menu.classList.contains(openClass)) {
        black_page.style.display = "none";
      } else {
        black_page.style.display = "block";
      }
    };
    

  ngOnInit(): void {
    const userId = this.authService.getUser();
    const toggle = document.querySelector(".nav-mobile-main-toggle") as HTMLElement;
    const menu = document.querySelector(".nav-mobile-side") as HTMLDivElement;
    const black_page = document.querySelector(".side-menu-black-page") as HTMLDivElement;
    const openClass = "nav-mobile-side-open";
    const closeClass = "nav-mobile-side-closed";
    const rightWhenClosed = "-25rem";
    const user = document.querySelectorAll('.nav-mobile-side .nav-mobile-side-user')
    const loggedOut = document.querySelectorAll('.nav-mobile-side .nav-mobile-side-loggedout')
    const avatar = document.querySelector('.nav-mobile-side .side-menu-avatar-container img') as HTMLImageElement;

     
        this.router.events.subscribe(val => {
          if (val instanceof NavigationEnd){
            if(!this.authService.isLogged()){
              user.forEach(item=>{
                  item.classList.add('display-none')
                  item.classList.remove('display-block')
              })
              loggedOut.forEach(item=>{
                item.classList.add('display-block');
                item.classList.add('display-none');
              })
              }else{
                loggedOut.forEach(item=>{
                  item.classList.add('display-none');
                  item.classList.remove('display-block');
                })
                user.forEach(item=>{
                  item.classList.add('display-block')
                  item.classList.remove('display-none')
              })
              }
          }
        });

        if(this.authService.isLogged()){
          this.asyncService.getData(`user/one/${userId}`)
          .subscribe(
            (res : any)=>{
              if(!res.user.avatar) return;
              avatar.src = res.user.avatar
            },
            err=>console.log(err)
          )
        }
    
    menu.style.right = rightWhenClosed;
    
    toggle.addEventListener("click", () => {
      this.toggleBlackPage(menu,black_page,openClass);
      this.navSideService.toggleMenu(menu, openClass, closeClass, rightWhenClosed);
    });
    
    black_page.addEventListener("click", () => {
      this.toggleBlackPage(menu,black_page,openClass);
      this.navSideService.toggleMenu(menu, openClass, closeClass, rightWhenClosed);
    });
    
    const logoutBtn = document.querySelector('.nav-mobile-side-logout a');
    if(logoutBtn){
        logoutBtn.addEventListener('click', ()=>{
            this.authService.removeUserLocal();
        })
    }
  }

}
