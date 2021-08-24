import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick , inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy , Location } from '@angular/common';
import { NavSideMobileComponent } from './nav-side-mobile.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NavSideMobileComponent', () => {
  let component: NavSideMobileComponent;
  let fixture: ComponentFixture<NavSideMobileComponent>;
  let authService: AuthService;
  let location: Location;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSideMobileComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers:[
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ]
       
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSideMobileComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('navigate to homepage', fakeAsync(() => {
    spyOn(authService,'isLogged').and.returnValue(false);
    router.navigate(['home']);
    tick();
    expect(authService.isLogged).toHaveBeenCalled();
    expect(location.path()).toBe('/');
  }))
  it('navigate to homepage', fakeAsync(() => {
    spyOn(authService,'isLogged').and.returnValue(true);
    router.navigate(['home']);
    tick();
    expect(authService.isLogged).toHaveBeenCalled();
    expect(location.path()).toBe('/');
  }))
  it('navigate to homepage', inject([UserService],fakeAsync((userService: UserService) => {
    spyOn(authService,'isLogged').and.returnValue(true);
    component.ngAfterViewInit();
    fixture.detectChanges();
    spyOn(userService, 'getUserData').and.callFake(() => {
      return of({
        username: 'bolnik',
      });
    });
    userService.getUserData('aaaa').subscribe((res: any) => {
      expect(res).toBeDefined();
    });
  })))

  it('should logout', fakeAsync(() => {
    const btn = fixture.debugElement.query(By.css('.nav-mobile-side-logout a'))
    .nativeElement;
    spyOn(authService, 'removeUserLocal').and.callThrough();
    btn.click();
    fixture.whenStable().then(() =>{
        fixture.detectChanges();
        expect(authService.removeUserLocal).toHaveBeenCalled();
    })
  }));
  it('should call handleBlackPageClick method', fakeAsync(() => {
    const div = fixture.debugElement.query(By.css('.side-menu-black-page'))
    .nativeElement;
    spyOn(component, 'handleBlackPageClick').and.callThrough();
    div.click();
    fixture.whenStable().then(() =>{
        fixture.detectChanges();
        expect(component.handleBlackPageClick).toHaveBeenCalled();
    })
  }));
}); 
