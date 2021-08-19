import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router} from '@angular/router';
import {Token} from '../../../interfaces/interfaces'
import {LoginFormData} from '../../../interfaces/interfaces'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , AfterViewInit {
  @ViewChildren('formElem') formElem!: QueryList<ElementRef>;
  @ViewChild('passError') passError!: ElementRef;

  constructor(private authService: AuthService , private userService : UserService
    ,private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void
  {
    this.formElem.forEach((e , i ) =>
    {
      e.nativeElement.onkeyup = () =>
      {
        this.passError.nativeElement.innerText = "";
      }
    });
  }

   printError = (id:string, error_text:string)=>
    {
        (document.getElementById(id) as HTMLDivElement).innerText = error_text
    }


  handleLogin = (event:Event)=>{
    event.preventDefault();
    const form = (event.target as any);

    let formData:LoginFormData = {
        username:'',
        password:'',
    }

    const email = form.username.value
    const password = form.password.value

    if(email===''|| password===''){
      this.printError("pass_error", "نام کاربری یا رمز عبور نمیتواند خالی باشد");
        return;
    }
      this.printError("pass_error", "");

        formData = {
            username : form.username.value,
            password : form.password.value,
        }

        this.userService.postLoginData(formData, 'user/login')
        .subscribe(
          (res : Token) => {
            if(form.remember_me.checked){
                const expiry = new Date(new Date().getTime()+(10*(86400000)))
                document.cookie = `username=${formData.username};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                document.cookie = `password=${formData.password};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                document.cookie = `username=${formData.username};expires=${expiry}`;
                document.cookie = `password=${formData.password};expires=${expiry}`;
              }else{
                document.cookie = `username=${formData.username};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                document.cookie = `password=${formData.password};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
              }
              this.authService.setUserLocal(res.token,res.id);
              this.authService.setExpiry(new Date());
              this.router.navigate(['profile/playlists']);

          },
          () => {  this.printError("pass_error", "اطلاعات وارد شده اشتباه است")}
        )
  }

}
