import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router, private location: Location) {}
  @ViewChild('footerRef') footerRef!: ElementRef;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const footer = this.footerRef.nativeElement;
    this.router.events.subscribe((val) => {
      if (!this.location.path().includes('user') && this.location.path() !== '') {
        footer.classList.add('footer-dark');
      } else {
        footer.classList.remove('footer-dark');
      }
    });
  }
}
