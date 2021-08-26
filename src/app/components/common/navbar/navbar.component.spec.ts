import { ComponentFixture, fakeAsync, TestBed, inject, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavSideService } from 'src/app/services/nav-side/nav-side.service';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy, Location } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { of, ReplaySubject } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from 'src/app/app-routing.module';

@Component({})
class mockedNavSideService {
  getNavMobileElms() {
    return {
      menu: '',
      openClass: '',
      closeClass: '',
      black_page: '',
      rightWhenClosed: '',
    };
  }
  toggleBlackPage() {}
  toggleMenu() {}
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navSideService: NavSideService;
  let mock: mockedNavSideService;
  let location: Location;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: NavSideService, useClass: mockedNavSideService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navSideService = new NavSideService();
    mock = new mockedNavSideService();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invoke handleToggle when toggle btn is clicked', fakeAsync(() => {
    const toggle = fixture.debugElement.query(By.css('.nav-mobile-main-toggle img')).nativeElement;
    spyOn(component, 'handleToggle').and.callThrough();
    toggle.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.handleToggle).toHaveBeenCalled();
    });
  }));

  it('should navigate to homepage', fakeAsync(() => {
    router.navigate(['home']);
    tick();
    expect(location.path()).toBe('/');
  }));
  it('should navigate to login page', fakeAsync(() => {
    router.navigate(['user/login']);
    tick();
    expect(location.path()).toBe('/user/login');
  }));
});
