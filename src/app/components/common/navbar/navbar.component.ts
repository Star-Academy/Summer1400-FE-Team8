import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from "@angular/common";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router , private location: Location) {
    
  }

  ngOnInit(): void {
    const navs = (document.querySelectorAll('nav'));

    this.router.events.subscribe(val => {
      if (this.location.path().includes('profile')) {
        navs.forEach(nav=>nav.classList.add('nav-dark'))
      } else {
        navs.forEach(nav=>nav.classList.remove('nav-dark'))
      }
    });
  }

}
