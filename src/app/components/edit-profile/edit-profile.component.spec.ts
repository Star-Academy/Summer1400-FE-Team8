import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { EditProfileComponent } from './edit-profile.component';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';
import { of } from 'rxjs';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocationStrategy, useClass: MockLocationStrategy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle submit', fakeAsync(() => {
    const form = fixture.debugElement.query(By.css('form'));
    const event: any = new Event('click');
    form.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(component.handleSubmitInfo(event)).toBeTruthy();
  }));
  it('should invoke handleSubmit method when submit btn is clicked', inject(
    [UserService],
    fakeAsync((userService: UserService) => {
      const userServiceSpy = spyOn(userService, 'editUserData').and.callThrough();
      const componentSpy = spyOn(component, 'handleSubmitInfo').and.callThrough();
      const query = fixture.debugElement.query(By.css('.edit-profile-submit-container input'));
      const btn: HTMLButtonElement = query.nativeElement;
      expect(userServiceSpy).not.toHaveBeenCalled();
      expect(componentSpy).not.toHaveBeenCalled();
      btn.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(userServiceSpy).toHaveBeenCalled();
        expect(componentSpy).toHaveBeenCalled();
      });
    })
  ));
  it('should invoke loadAvatar method when file input is changed', fakeAsync(() => {
    spyOn(component, 'loadAvatar').and.callThrough();
    const query = fixture.debugElement.query(By.css('form input[type="file"]'));
    const input: HTMLInputElement = query.nativeElement;
    const event: any = new Event('change');
    input.dispatchEvent(event);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.loadAvatar).toHaveBeenCalled();
    });
  }));

  it('should get user data', inject([UserService], (userService: UserService) => {
    spyOn(userService, 'getUserData').and.callFake(() => {
      return of({
        username: 'bolnik',
        avatar: 'file1',
      });
    });
    userService.getUserData('aaaa').subscribe((res: any) => {
      expect(res.username).toEqual('bolnik');
    });
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(userService.getUserData).toHaveBeenCalled();
  }));
});
