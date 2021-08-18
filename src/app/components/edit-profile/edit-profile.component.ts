import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService: UserService , private authService: AuthService) { }

  @ViewChild('formRef') formRef !: ElementRef;
  @ViewChild('avatarRef') avatarRef !: ElementRef;
  
  editedUserInfo ={
    username : '',
    email : '',
    firstName:'',
    lastName:'',
    password:'',
    gender:0,
    birthDate:'',
    avatar:'',
    token:''
  }

  handleSubmitInfo(e: any) {
    e.preventDefault();
    const token = this.authService.getToken() as string;
    const form = this.formRef.nativeElement;

    const b = form.birth_date.value.replace(/\//g,'-').split('-').reverse();
    let temp
    temp= b[1];
    b[1] = b[2];
    b[2] = temp;
    const birthDate = b.join('-');
    this.editedUserInfo = {
        ...this.editedUserInfo,
        firstName : form.first_name.value,
        lastName : form.last_name.value,
        username : form.username.value,
        email : form.email.value,
        password : form.password.value,
        gender : parseInt(form.gender.value),
        birthDate: birthDate ==='--'?null:birthDate,
        token
    }

    this.userService.editUserData(this.editedUserInfo, token).subscribe(res=>console.log(res))
  }

  loadAvatar(e:any){
    const file = e.target.files[0];
    const avatar  = this.avatarRef.nativeElement;
    if(e.target.files.length!==0){
      avatar.src = URL.createObjectURL(file);
    }
    let reader = new FileReader();
    reader.onload = (e:any) => {
    let image = e.target.result;
     this.editedUserInfo = {...this.editedUserInfo, avatar: image}
    };
    reader.readAsDataURL(file);
  }

  ngAfterViewInit() {
    const userId  = this.authService.getUser();
    const form = this.formRef.nativeElement;

    this.userService.getUserData(`user/one/${userId}`)
    .subscribe((res:any) =>{
        const userInfo = res.user;
        // form['username'].value = 'aaaa'
        for(const property in userInfo){
          if(property==='avatar'){
            if(userInfo[property]) this.avatarRef.nativeElement.src = userInfo[property];
          }else if(property==='gender'){
            if(userInfo[property]) form.gender.value = userInfo.gender.toString();
          }else if(property==='birth_date'){
           if(userInfo[property]){
            // form.birth_date.placeholder = userInfo.birth_date.substr(0,10).split('-').reverse().join('/');
           }
          }else{
            if(form[property]){
              form[property].value = userInfo[property]
            }
            
          }
      }
        
    })
  }

  ngOnInit(): void {
   
  }

}
