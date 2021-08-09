users = {}
const token = getToken();
if(token){
    window.location.replace('/playlists.html')
  }

const form = document.querySelector('.signup-box form')

triggerPasswordStrength(form.password,'pass_error');

document.register_form.email.addEventListener("keyup", () => {
    document.getElementById("mail_error").innerHTML = "";
});
document.register_form.repeat_password.addEventListener("keyup", () => {
    document.getElementById("repeat_error").innerHTML = "";
});


async function register_validation(event) {
    event.preventDefault();
    let formData = {
        username : '',
        email:'',
        password:'',
        firstName:'',
        lastName:'',
    }

    const isError = validateForm(event.target);

    if (!(isError))
    {      
        let form = event.target;
        for(let i = 0; i < form.length; i++){
            if(!(form[i].name==='submit' || form[i].name==='password_repeat')) {
                formData = {
                    ...formData,
                    [form[i].name] : form[i].value
                }
            }
        }

        await fetch(`${api}/user/register`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          })
          .then(data => {
              if(!data.ok){
                print_error("mail_error", "ایمیل یا نام کاربری از قبل در سیستم ثبت شده");
                return;
              }
              return data.json();
              })
              .then(res => {
                if(res===undefined) return;
                document.querySelector('.signup-success').style.display = 'block';
                setTimeout(() => {
                    window.location.replace("http://127.0.0.1:5500/pages/login.html");
                }, 500)
              })
          .catch((error) => {
            alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
        });
           

        
       
    }

}
