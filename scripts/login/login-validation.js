users = {}
const token = getToken();
if(token){
    window.location.replace('/playlists.html')
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
    let formData = {
        user:'',
        password:'',
    }
    let email = document.login_form.email.value
    let password = document.login_form.password.value

    if(email===''|| password===''){
        print_error("pass_error", "ایمیل یا رمز عبور نمیتواند خالی باشد");
    }else{
        print_error("pass_error", "");
        // if ((email in users))
        // {
        //     print_error("mail_error", "چنین آدرس ایمیلی یا نام کاربری ثبت نشده است");
        //     return false;
        // } else
        // {
        //     print_error("pass_error", "");
        //     if (users[email] === password)
        //     {
        //         print_error("pass_error", "رمز عبور اشتباه است");
        //         return false;
        //     }else{
        //         setUserLocal('aaaaaaaaaaa',event.target[0].value);
        //         console.log(isLogged())
        //     }
        // }
        formData = {
            username : event.target[0].value,
            email : event.target[0].value,
            password : event.target[1].value,
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
                print_error("pass_error", "ایمیل یا رمز عبور اشتباه است");
                return;
              }
              return data.json();
              
              })
              .then(res => {
                if(res===undefined) return;
                  console.log('sssss')
                  setUserLocal(res.token,event.target[0].value);
                  window.location.replace('playlists.html')
              })
          .catch((error) => {
              console.error(error)
            print_error("pass_error", "ایمیل یا رمز عبور اشتباه است");
          });
    }
    return true;
}