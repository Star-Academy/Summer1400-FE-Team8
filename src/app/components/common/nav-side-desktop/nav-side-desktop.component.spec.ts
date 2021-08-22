import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { NavSideDesktopComponent } from './nav-side-desktop.component';

describe('NavSideDesktopComponent', () => {
  let component: NavSideDesktopComponent;
  let fixture: ComponentFixture<NavSideDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSideDesktopComponent ],
      providers:[
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavSideDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
