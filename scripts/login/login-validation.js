users = {}
const token = getToken();

if(token){
    window.location.replace('/playlists.html')
  }

// set username and password if there is cookie
const cookieData = document.cookie.split(';');
console.log(cookieData)
if(cookieData[0]){
  let cookieUsername,cookiePassword='';

  for(let i in cookieData){
    if(cookieData[i].split('=')[0].trim() ==='username'){
      cookieUsername = cookieData[i].split('=')[1];
      console.log(cookieData[i].split('=')[1])
    }else if(cookieData[i].split('=')[0].trim() ==='password'){
      cookiePassword = cookieData[i].split('=')[1]
    }
  }
  const loginForm = document.querySelector('.login-box form');
  loginForm.email.value = cookieUsername;
  loginForm.password.value = cookiePassword;

}

  
document.login_form.email.addEventListener("keyup" , ()=>{

   document.getElementById("mail_error").innerHTML = "";
});

function print_error(id, error_text)
{
    document.getElementById(id).innerText = error_text
}

async function login_validation(event)
{
    event.preventDefault();
    const form = event.target
    let formData = {
        user:'',
        password:'',
    }
    let email = document.login_form.email.value
    let password = document.login_form.password.value

    if(email===''|| password===''){
        print_error("pass_error", "نام کاربری یا رمز عبور نمیتواند خالی باشد");
    }else{
        print_error("pass_error", "");

        formData = {
            username : form[0].value,
            password : form[1].value,
        }
        await fetch(`${api}/user/login`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          })
          .then(data => {
              if(!data.ok){
                print_error("pass_error", "نام کاربری یا رمز عبور اشتباه است");
                return;
              }
              return data.json();
              
              })
              .then(res => {
                if(res===undefined) return;
                 if(form.remember_me.checked){
                   const expiry = new Date(new Date().getTime()+(10*(86400000)))
                  document.cookie = `username=${formData.username};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                  document.cookie = `password=${formData.password};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                  document.cookie = `username=${formData.username};expires=${expiry}`;
                  document.cookie = `password=${formData.password};expires=${expiry}`;
                  
                 }
                  setUserLocal(res.token,res.id);
                  setExpiry(new Date())
                  window.location.replace('playlists.html')
              })
          .catch((error) => {
              console.error(error)
            print_error("pass_error", "نام کاربری یا رمز عبور اشتباه است");
          });
    }
    return true;
}