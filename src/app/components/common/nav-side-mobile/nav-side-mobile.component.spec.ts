import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


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
