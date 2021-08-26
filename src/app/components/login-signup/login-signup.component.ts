import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  constructor(private router: Router) {}
  @ViewChild('loginBtnRef') loginBtnRef!: ElementRef;
  @ViewChild('signupBtnRef') signupBtnRef!: ElementRef;
  handleChangeBtnsStyle() {
    const loginBtn = this.loginBtnRef.nativeElement;
    const signupBtn = this.signupBtnRef.nativeElement;
    if (this.router.url.includes('login')) {
      loginBtn.classList.add('ls-top-btn-active');
      loginBtn.classList.remove('ls-top-btn-idle');
      signupBtn.classList.remove('ls-top-btn-active');
      signupBtn.classList.add('ls-top-btn-idle');
    } else {
      signupBtn.classList.add('ls-top-btn-active');
      signupBtn.classList.remove('ls-top-btn-idle');
      loginBtn.classList.add('ls-top-btn-idle');
      loginBtn.classList.remove('ls-top-btn-active');
    }
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.handleChangeBtnsStyle();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.handleChangeBtnsStyle();
      }
    });
  }
}
