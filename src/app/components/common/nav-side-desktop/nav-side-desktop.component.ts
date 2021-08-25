import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavSideService } from 'src/app/services/nav-side/nav-side.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-nav-side-desktop',
  templateUrl: './nav-side-desktop.component.html',
  styleUrls: ['./nav-side-desktop.component.scss'],
})
export class NavSideDesktopComponent implements OnInit {
  constructor(
    private navSideService: NavSideService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @ViewChild('toggleBtnRef') toggleBtnRef!: ElementRef;
  @ViewChild('toggleBtnImgRef') toggleBtnImgRef!: ElementRef;
  @ViewChild('menuRef') menuRef!: ElementRef;
  @ViewChild('avatarRef') avatarRef!: ElementRef;

  handleShowMenu() {
    return this.authService.isLogged();
  }
  toggleImgMove(menu: HTMLDivElement, openClass: string, toggleImg: HTMLImageElement) {
    if (menu.classList.contains(openClass)) {
      toggleImg.style.transform = 'rotateY(0deg)';
    } else {
      toggleImg.style.transform = 'rotateY(180deg)';
    }
  }

  handleToggleBtn() {
    const menu = this.menuRef.nativeElement;
    const toggleImg = this.toggleBtnImgRef.nativeElement;
    const openClass = 'nav-desktop-side-open';
    const closeClass = 'nav-desktop-side-closed';
    const rightWhenClosed = '-13.43rem';
    this.toggleImgMove(menu, openClass, toggleImg);
    this.navSideService.toggleMenu(menu, openClass, closeClass, rightWhenClosed);
  }
  handleLogout() {
    this.authService.removeUserLocal();
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.authService.isLogged()) {
      const userId = this.authService.getUser();
      const menu = this.menuRef.nativeElement;
      const rightWhenClosed = '-13.43rem';
      const avatar = this.avatarRef.nativeElement;

      this.userService.getUserData(`user/one/${userId}`).subscribe((res: any) => {
        if (!res.user.avatar) return;
        avatar.src = res.user.avatar;
      });
      menu.style.right = rightWhenClosed;
    }
  }
}
