import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    private navSideService : NavSideService
  ) {}

  @ViewChild('toggleRef') toggleRef!: ElementRef;
  ngAfterViewInit(): void {
    this.navSideService.setToggleElm(this.toggleRef.nativeElement)
  }
  ngOnInit(): void {
    const navs = document.querySelectorAll('nav');

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (
          !this.location.path().includes('user') &&
          this.location.path() !== ''
        ) {
          console.log('aaaaaaaaaaaaaaa');
          navs.forEach((nav) => nav.classList.add('nav-dark'));
        } else {
          navs.forEach((nav) => nav.classList.remove('nav-dark'));
        }

        const loggedOutItems = document.querySelectorAll(
          '.nav-menu-item-loggedout'
        );
        loggedOutItems.forEach((item) => {
          if (this.authService.isLogged()) {
            item.classList.add('display-none');
          } else {
            item.classList.remove('display-none');
          }
        });
      }
    });
  }
}
