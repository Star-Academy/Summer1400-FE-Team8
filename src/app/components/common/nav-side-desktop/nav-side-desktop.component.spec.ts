import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { NavSideDesktopComponent } from './nav-side-desktop.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('NavSideDesktopComponent', () => {
  let component: NavSideDesktopComponent;
  let fixture: ComponentFixture<NavSideDesktopComponent>;
  let authService: AuthService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavSideDesktopComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocationStrategy, useClass: MockLocationStrategy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSideDesktopComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call handleShowMenu method', () => {
    spyOn(component, 'handleShowMenu').and.returnValue(true);
    fixture.detectChanges();
    expect(component.handleShowMenu).toHaveBeenCalled();
  });

  it('should logout', fakeAsync(() => {
    spyOn(component, 'handleShowMenu').and.returnValue(true);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.nav-desktop-side-logout a')).nativeElement;
    spyOn(authService, 'removeUserLocal').and.callThrough();
    btn.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(authService.removeUserLocal).toHaveBeenCalled();
    });
  }));
  it('should call handleBlackPageClick method', fakeAsync(() => {
    spyOn(component, 'handleShowMenu').and.returnValue(true);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.side-menu-toggle button')).nativeElement;
    spyOn(component, 'handleToggleBtn').and.callThrough();
    btn.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.handleToggleBtn).toHaveBeenCalled();
    });
    expect(component).toBeTruthy();
  }));
  it('should call isLogged service method', () => {
    spyOn(component, 'handleShowMenu').and.returnValue(true);
    fixture.detectChanges();
    spyOn(authService, 'isLogged').and.returnValue(true);
    component.ngAfterViewInit();
    expect(authService.isLogged).toHaveBeenCalled();
  });
});
