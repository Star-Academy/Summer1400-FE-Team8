import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavSideService } from 'src/app/services/nav-side/nav-side.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-nav-side-mobile',
  templateUrl: './nav-side-mobile.component.html',
  styleUrls: ['./nav-side-mobile.component.scss'],
})
export class NavSideMobileComponent implements OnInit {
  constructor(
    private navSideService: NavSideService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  @ViewChild('menuRef') menuRef!: ElementRef;
  @ViewChild('blackPageRef') blackPageRef!: ElementRef;
  @ViewChild('avatarRef') avatarRef!: ElementRef;
  @ViewChild(NavbarComponent) navbarRef!: NavbarComponent;
  @ViewChildren('userRef') userRef!: QueryList<ElementRef>;
  @ViewChildren('loggedOutRef') loggedOutRef!: QueryList<ElementRef>;
  toggleBlackPage = (menu: HTMLDivElement, black_page: HTMLDivElement, openClass: string) => {
    if (menu.classList.contains(openClass)) {
      black_page.style.display = 'none';
    } else {
      black_page.style.display = 'block';
    }
  };

  handleBlackPageClick() {
    const menu = this.menuRef.nativeElement;
    const black_page = this.blackPageRef.nativeElement;
    const openClass = 'nav-mobile-side-open';
    const closeClass = 'nav-mobile-side-closed';
    const rightWhenClosed = '-25rem';
    this.toggleBlackPage(menu, black_page, openClass);
    this.navSideService.toggleMenu(menu, openClass, closeClass, rightWhenClosed);
  }
  handleLogout() {
    this.authService.removeUserLocal();
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const userId = this.authService.getUser();
    const menu = this.menuRef.nativeElement;
    const black_page = this.blackPageRef.nativeElement;
    const avatar = this.avatarRef.nativeElement;
    const user = this.userRef.toArray();
    const loggedOut = this.loggedOutRef.toArray();
    const openClass = 'nav-mobile-side-open';
    const closeClass = 'nav-mobile-side-closed';
    const rightWhenClosed = '-25rem';
    this.navSideService.setNavMobileElms(menu, black_page, openClass, closeClass, rightWhenClosed);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (!this.authService.isLogged()) {
          user.forEach((item: any) => {
            item.nativeElement.classList.add('display-none');
            item.nativeElement.classList.remove('display-block');
          });
          loggedOut.forEach((item: any) => {
            item.nativeElement.classList.add('display-block');
            item.nativeElement.classList.add('display-none');
          });
        } else {
          loggedOut.forEach((item: any) => {
            item.nativeElement.classList.add('display-none');
            item.nativeElement.classList.remove('display-block');
          });
          user.forEach((item: any) => {
            item.nativeElement.classList.add('display-block');
            item.nativeElement.classList.remove('display-none');
          });
        }
      }
    });

    if (this.authService.isLogged()) {
      this.userService.getUserData(`user/one/${userId}`).subscribe((res: any) => {
        if (!res.user.avatar) return;
        avatar.src = res.user.avatar;
      });
    }

    menu.style.right = rightWhenClosed;
  }
}
