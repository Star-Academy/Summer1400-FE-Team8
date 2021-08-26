import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormValidationService } from './form-validation.service';
@Component({
  template: `
    <form>
      <input type="password" />
      <div id="pass_error"></div>
    </form>
  `,
})
class TestComponent {}
describe('FormValidationService', () => {
  let service: FormValidationService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationService);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should identify password as weak', () => {
    const input = fixture.debugElement.query(By.css('form input')).nativeElement;
    input.value = 'aaaaa';
    service.checkPasswordStrength(input, 'pass_error');
    expect(service.passwordStrength).toBe('weak');
  });
  it('should identify password as medium', () => {
    const input = fixture.debugElement.query(By.css('form input')).nativeElement;
    input.value = 'Akbar_99796';
    service.checkPasswordStrength(input, 'pass_error');
    expect(service.passwordStrength).toBe('medium');
  });
  it('should identify password as strong', () => {
    const input = fixture.debugElement.query(By.css('form input')).nativeElement;
    input.value = 'Akbar_99796@~!';
    service.checkPasswordStrength(input, 'pass_error');
    expect(service.passwordStrength).toBe('strong');
  });
  it('should identify password as unknown', () => {
    const input = fixture.debugElement.query(By.css('form input')).nativeElement;
    input.value = 'aaa';
    service.checkPasswordStrength(input, 'pass_error');
    expect(service.passwordStrength).toBe('');
  });
});
