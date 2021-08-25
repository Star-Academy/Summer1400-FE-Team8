import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}
  passwordStrength = '';
  validateForm = (form: any) => {
    let emailRegex = /^\S+@\S+\.\S+$/;
    let usernameRegex = /^(?=[a-zA-Z_\d]*[a-zA-Z])[a-zA-Z_\d]{5,}$/;
    const errorIds = {
      emailErrorId: 'mail_error',
      usernameErrorId: 'username_error',
      passErrorId: 'pass_error',
      repeatPassErrorId: 'repeat_error',
    };
    const error = {
      email_error: false,
      username_error: false,
      password_error: false,
      repeat_error: false,
      check: function () {
        return this.email_error || this.username_error || this.password_error || this.repeat_error;
      },
    };

    if (form.email) {
      if (!emailRegex.test(form.email.value)) {
        error.email_error = true;
        this.print_error(errorIds.emailErrorId, 'لطفا ایمیل معتبری وارد کنید');
      } else {
        this.print_error(errorIds.emailErrorId, '');
      }
    }
    if (form.username) {
      if (!usernameRegex.test(form.username.value)) {
        error.username_error = true;
        this.print_error(errorIds.usernameErrorId, 'لطفا نام کاربری معتبری وارد کنید (حداقل 5 کاراکتر)');
      } else {
        this.print_error(errorIds.usernameErrorId, '');
      }
    }
    if (form.password) {
      if ((document.getElementById(errorIds.passErrorId) as HTMLInputElement).style.color === 'red') {
        error.password_error = true;
        this.print_error(errorIds.passErrorId, 'امنیت پسورد نباید ضعیف باشد');
      } else {
        this.print_error(errorIds.passErrorId, '');
      }
    }
    if (form.repeat_password) {
      if (!(form.password.value === form.repeat_password.value)) {
        error.repeat_error = true;
        this.print_error(errorIds.repeatPassErrorId, 'رمز عبور مطابقت ندارد');
      } else {
        this.print_error(errorIds.repeatPassErrorId, '');
      }
    }

    return error.check();
  };

  triggerPasswordStrength = (passwordElm: any, passErrorId: any) => {
    passwordElm.addEventListener('keyup', () => {
      this.checkPasswordStrength(passwordElm, passErrorId);
    });
  };

  print_error = (id: any, error_text: any) => {
    (document.getElementById(id) as HTMLDivElement).innerText = error_text;
  };

  checkPasswordStrength = (code: any, pass_error: any) => {
    const check_apart = [];
    check_apart.push('[$@$!%*#?&]');
    check_apart.push('[A-Z]');
    check_apart.push('[0-9]');
    check_apart.push('[a-z]');

    let ctr = 0;
    for (let i = 0; i < check_apart.length; i++) {
      if (new RegExp(check_apart[i]).test(code.value)) {
        ctr++;
      }
    }
    let color = '';
    let strength = '';

    if (code.value.length >= 4) {
      if (ctr <= 2) {
        color = 'red';
        strength = 'امنیت : ضعیف';
        this.passwordStrength = 'weak';
      } else if (ctr === 3) {
        color = 'orange';
        strength = 'امنیت : متوسط';
        this.passwordStrength = 'medium';
      } else if (ctr === 4) {
        color = 'green';
        strength = 'امنیت : قوی';
        this.passwordStrength = 'strong';
      }
    } else {
      color = 'red';
      strength = '';
    }

    (document.getElementById(pass_error) as HTMLDivElement).style.color = color;
    (document.getElementById(pass_error) as HTMLDivElement).innerHTML = strength;
  };
}
