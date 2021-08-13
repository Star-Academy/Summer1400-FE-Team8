import { Component, OnInit } from '@angular/core';
import { Router,  NavigationEnd} from '@angular/router';
import { Location } from "@angular/common";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router , private location: Location) {
    
   }

  ngOnInit(): void {
    const footer = (document.querySelector('footer') as HTMLElement)
    this.router.events.subscribe(val => {
      if (this.location.path().includes('profile')) {
        footer.classList.add('footer-dark')
      } else {
        footer.classList.remove('footer-dark')
      }
    });
  }

}
