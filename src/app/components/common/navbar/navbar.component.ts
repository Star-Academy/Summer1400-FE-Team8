import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavSideService } from 'src/app/services/nav-side/nav-side.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private navSideService: NavSideService
  ) {}

  @ViewChild('toggleRef') toggleRef!: ElementRef;
  @ViewChildren('navRef') navRef!: QueryList<ElementRef>;
  @ViewChildren('loggedOutItemRef') loggedOutItemRef!: QueryList<ElementRef>;

  handleToggle() {
    const params = this.navSideService.getNavMobileElms();
    this.navSideService.toggleBlackPage(
      params.menu,
      params.black_page,
      params.openClass
    );
    this.navSideService.toggleMenu(
      params.menu,
      params.openClass,
      params.closeClass,
      params.rightWhenClosed
    );
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const navs = this.navRef.toArray();

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          !this.location.path().includes('user') &&
          this.location.path() !== ''
        ) {
          navs.forEach((nav) => nav.nativeElement.classList.add('nav-dark'));
        } else {
          navs.forEach((nav) => nav.nativeElement.classList.remove('nav-dark'));
        }

        const loggedOutItems = this.loggedOutItemRef.toArray();

        loggedOutItems.forEach((item) => {
          if (this.authService.isLogged()) {
            item.nativeElement.classList.add('display-none');
          } else {
            item.nativeElement.classList.remove('display-none');
          }
        });
      }
    });
  }
}
