import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick, inject, waitForAsync, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { SignupComponent } from './signup.component';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';
import { Token } from 'src/app/interfaces/interfaces';
import { routes } from 'src/app/app-routing.module';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [{ provide: LocationStrategy, useClass: MockLocationStrategy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should signUp user', inject(
    [UserService],
    fakeAsync((userService: UserService) => {
      spyOn(userService, 'postSignupData').and.callFake(() => {
        const data: Token = {
          id: '2',
          token: 'zz',
        };
        return of(data);
      });
      spyOn(component, 'handleSignup').and.callThrough();
      const submitBtn = fixture.debugElement.query(By.css('.signup-submit-container button')).nativeElement;
      const form = fixture.debugElement.query(By.css('form')).nativeElement;
      form.username.value = 'bolnik';
      form.email.value = 'bolnik@bolnik.com';
      form.password.value = 'Akbar_1974';
      form.repeat_password.value = 'Akbar_1974';
      fixture.detectChanges();
      submitBtn.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.handleSignup).toHaveBeenCalled();
      });
      flush();
    })
  ));
});
