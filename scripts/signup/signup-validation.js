users = {}
const token = getToken();
if(token){
    window.location.replace('/playlists.html')
  }
  

function print_error(id, error_text) {
    document.getElementById(id).innerText = error_text
}

let code = document.register_form.password;
code.addEventListener("keyup", password_strenth);
document.register_form.email.addEventListener("keyup", () => {
    document.getElementById("mail_error").innerHTML = "";
});
document.register_form.password_repeat.addEventListener("keyup", () => {
    document.getElementById("repeat_error").innerHTML = "";
});
// if(document.register_form.name){
//     document.register_form.name.addEventListener("keyup", () => {
//         document.getElementById("name_error").innerHTML = "";
//     });
// }



function password_strenth()
{
    const check_apart = [];
    check_apart.push("[$@$!%*#?&]");
    check_apart.push("[A-Z]");
    check_apart.push("[0-9]");
    check_apart.push("[a-z]");

    let ctr = 0;
    for (let i = 0; i < check_apart.length; i++)
    {
        if (new RegExp(check_apart[i]).test(code.value))
        {
            ctr++;
            // console.log(ctr)
        }
    }
    let color = ""
    let strenght = ""
    if (code.value.length >= 4)
    {
        if (ctr <= 2)
        {
            color = "red";
            strenght = "امنیت : ضعیف";
        }
        else if (ctr === 3)
        {
            color = "orange";
            strenght = "امنیت : متوسط";
        }
        else if (ctr === 4)
        {
            color = "green";
            strenght = "امنیت : قوی";
        }
    }
    else
    {
        color = "red";
        strenght = "";
    }
    document.getElementById("pass_error").style.color = color;
    document.getElementById("pass_error").innerHTML = strenght;
}


async function register_validation(event) {
    event.preventDefault();
    let formData = {
        username : '',
        email:'',
        password:'',
        firstName:'',
        lastName:'',
    }
    let regex = /^\S+@\S+\.\S+$/;
    let usernameRegex = /^(?=[a-zA-Z_\d]*[a-zA-Z])[a-zA-Z_\d]{5,}$/;

    let name = document.register_form.firstName.value;
    let email = document.register_form.email.value;
    let username = document.register_form.username.value;
    let password = document.register_form.password.value;
    let password_repeat = document.register_form.password_repeat.value;

    const error = {
        email_exists:false,username_exists:false,relevant_password:false, repeat:false,
        check : function(){
            return this.email_exists || this.username_exists || this.relevant_password || this.repeat;
        }
    }
    if (users.hasOwnProperty(username))
    {
        error.username_exists = true;
        print_error("username_error", "این نام کاربری قبلا استفاده شده است.")
    }
    else
    {
        if (!usernameRegex.test(username))
        {
            error.username_exists = true;
            print_error("username_error", "نام کاربری حداقل باید 5 حرف باشد (حروف و اعداد و '_' )")
        } else
        {
            print_error("username_error", "")
        }
    }

    if (users.hasOwnProperty(email))
    {
        error.email_exists = true;
        print_error("mail_error", "آدرس ایمیل قبلا استفاده شده است.")
    }
    else
    {
        if (!regex.test(email))
        {
            error.email_exists = true;
            print_error("mail_error", "لطفا ایمیل معتبری وارد کنید")
        } else
        {
            print_error("mail_error", "")
        }
    }

    if (document.getElementById("pass_error").style.color === "red")
    {
        error.relevant_password = true;
        print_error("pass_error", "امنیت پسورد نباید ضعیف باشد");
    }

    if (!(password === password_repeat))
    {
        error.repeat = true;
        print_error("repeat_error", "رمز عبور مطابقت ندارد")
    } else
    {
        print_error("repeat_error", "")
    }
    console.log(error.check())
    if (!(error.check()))
    {
            users[email] = password;
           
        let form = event.target;
        for(let i = 0; i < form.length; i++){
            if(!(form[i].name==='submit' || form[i].name==='password_repeat')) {
                formData = {
                    ...formData,
                    [form[i].name] : form[i].value
                }
            }
        }
        // console.log(formData)
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
                    window.location.replace("http://127.0.0.1:5500/login.html");
                }, 500)
              })
          .catch((error) => {
            alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
        });
           

        
       
    }
    users["1"] = "2";
    // console.log(users);

}
