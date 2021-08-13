import { Component, OnInit } from '@angular/core';
import { NavSideService } from 'src/app/services/nav-side/nav-side.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AsyncService } from 'src/app/services/async/async.service';
import { NavigationEnd, Router} from '@angular/router';
@Component({
  selector: 'app-nav-side-desktop',
  templateUrl: './nav-side-desktop.component.html',
  styleUrls: ['./nav-side-desktop.component.scss']
})
export class NavSideDesktopComponent implements OnInit {

  constructor(private navSideService : NavSideService,
    private authService:AuthService , private router:Router , private asyncService : AsyncService) { }

  toggleImgMove = (menu:HTMLDivElement,openClass:string,toggleImg:HTMLImageElement) => {
    if (menu.classList.contains(openClass)) {
      toggleImg.style.transform = "rotateY(0deg)";
    } else {
      toggleImg.style.transform = "rotateY(180deg)";
    }
  };
    
  ngOnInit(): void {
    const userId = this.authService.getUser();    
    const toggle = (document.querySelector(".side-menu-toggle button") as HTMLButtonElement);
    const toggleImg = (document.querySelector(".side-menu-toggle button img") as HTMLImageElement);
    const menu =( document.querySelector(".nav-desktop-side") as HTMLDivElement);
    const openClass = "nav-desktop-side-open";
    const closeClass = "nav-desktop-side-closed";
    const rightWhenClosed = "-13.43rem";
    const avatar = (document.querySelector('.nav-desktop-side .side-menu-avatar-container img') as HTMLImageElement);

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd){
        if(!this.authService.isLogged()){
          menu.classList.add('display-none')
        }else{
            menu.classList.add('display-block')
            this.asyncService.getData(`user/one/${userId}`)
            .subscribe(
              (res : any)=>{
                if(!res.user.avatar) return;
                avatar.src = res.user.avatar
              },
              err=>console.log(err)
            )
        }
      }
    });

  menu.style.right = rightWhenClosed;
  
  toggle.addEventListener("click", () => {
    this.toggleImgMove(menu,openClass,toggleImg);
    this.navSideService.toggleMenu(menu, openClass, closeClass, rightWhenClosed);
  });
  
  // ------ logout button
  const logoutBtn = (document.querySelector('.nav-desktop-side-logout a') as HTMLAnchorElement);
  logoutBtn.addEventListener('click', ()=>{
      this.authService.removeUserLocal();
  })
  }

}
