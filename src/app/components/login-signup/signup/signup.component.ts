import { Component, OnInit } from '@angular/core';
import {FormValidationService} from '../../../services/form-validation/form-validation.service'
import {AsyncService} from '../../../services/async/async.service'
import { Router} from '@angular/router';
import {Token , SignupFormData} from '../../../interfaces/interfaces'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private formValidationService: FormValidationService ,
     private asyncService: AsyncService , private router: Router ,) { }


  ngOnInit(): void {
    const passwordElm = document.querySelector('form input[name="password"]');
    this.formValidationService.triggerPasswordStrength(passwordElm,'pass_error');
  }

  print_error(id:any, error_text:any){
    (<HTMLDivElement>document.getElementById(id)).innerText = error_text
  }


  async handleSignup(event:Event) {
    event.preventDefault();
    let formData :SignupFormData = {
      username : '',
      email:'',
      password:'',
      firstName:'',
      lastName:'',
  }

    const form = (document.querySelector('form') as any);

    if(!(this.formValidationService.validateForm(form))){

        for(let i = 0; i < form.length; i++){
            if(!(form[i].name==='submit' || form[i].name==='password_repeat')) {
                formData = {
                    ...formData,
                    [form[i].name] : form[i].value
                }
            }
        }

         this.asyncService.postSignupData(formData,'user/register').subscribe(
          ()=> {  (document.querySelector('.signup-success') as HTMLDivElement).style.display = 'block'; },
          error => {  this.print_error("mail_error", "ایمیل یا نام کاربری از قبل در سیستم ثبت شده")},
          () => {
            setTimeout(() => {
              this.router.navigate(['user/login'])
            }, 1000)
          }
         )
    }
}

}
