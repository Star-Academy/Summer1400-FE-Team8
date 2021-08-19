import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormValidationService} from '../../../services/form-validation/form-validation.service'
import {UserService} from '../../../services/user/user.service'
import { Router} from '@angular/router';
import {Token , SignupFormData} from '../../../interfaces/interfaces'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit , AfterViewInit {
  @ViewChildren('formElem')  formElem!: QueryList<ElementRef>;
  @ViewChildren('errorElem') errorElem!: QueryList<ElementRef>;

  constructor(private formValidationService: FormValidationService ,
              private userService: UserService , private router: Router ,) { }


  ngOnInit(): void {
    const passwordElm = document.querySelector('form input[name="password"]');
    this.formValidationService.triggerPasswordStrength(passwordElm,'pass_error');
  }
  ngAfterViewInit()
  {
    this.formElem.forEach((e , i ) =>
    {
      e.nativeElement.onkeyup = () => {
        this.errorElem.toArray()[i].nativeElement.innerText = "";
    }
    });
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

      this.userService.postSignupData(formData,'user/register').subscribe(
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
