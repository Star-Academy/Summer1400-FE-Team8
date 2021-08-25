import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed , inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { LoginComponent } from './login.component';
import { UserService } from 'src/app/services/user/user.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Token } from 'src/app/interfaces/interfaces';
import { routes } from 'src/app/app-routing.module';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user',inject([UserService],fakeAsync((userService: UserService) => {
    spyOn(userService,'postLoginData').and.callFake(()=>{
      const data : Token = {
        id:'1',
        token:'aa'
      }
      return of(data);
    })
    spyOn(component, 'handleLogin').and.callThrough();  
    const submitBtn = fixture.debugElement
    .query(By.css('.login-submit-container input')).nativeElement;
    const form = fixture.debugElement
    .query(By.css('form')).nativeElement;
    form.remember_me.checked=true;
    form.username.value = 'aa';
    form.password.value = 'aa';
    fixture.detectChanges();
    submitBtn.click();
    tick();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      userService.postLoginData({username:'a',password:'b'},'aa')
      .subscribe((res)=>{
        expect(res.id).toEqual('1');
      })
      expect(component.handleLogin).toHaveBeenCalled()
    })
  })));
});
