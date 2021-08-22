import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { NavSideMobileComponent } from './nav-side-mobile.component';

describe('NavSideMobileComponent', () => {
  let component: NavSideMobileComponent;
  let fixture: ComponentFixture<NavSideMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSideMobileComponent],
      imports: [
        RouterTestingModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
