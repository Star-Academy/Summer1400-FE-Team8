import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { LoginSignupComponent } from './login-signup.component';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSignupComponent],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      providers: [{ provide: LocationStrategy, useClass: MockLocationStrategy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('login btn should be active when navigate to login', fakeAsync(() => {
    router.navigateByUrl('user/login');
    tick();
    const loginBtn = fixture.debugElement.query(By.css('.ls-top-btn-login')).nativeElement;
    const signUpBtn = fixture.debugElement.query(By.css('.ls-top-btn-register')).nativeElement;
    expect(loginBtn.classList).toContain('ls-top-btn-active');
    expect(signUpBtn.classList).not.toContain('ls-top-btn-active');
  }));
});
