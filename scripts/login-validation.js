users = {}

document.login_form.email.addEventListener("keyup" , ()=>{

   document.getElementById("mail_error").innerHTML = "";
});

function print_error(id, error_text)
{
    document.getElementById(id).innerText = error_text
}

function login_validation(event)
{
    event.preventDefault();
    let email = document.login_form.email.value
    let password = document.login_form.password.value

    if(email===''|| password===''){
        print_error("pass_error", "ایمیل یا رمز عبور نمیتواند خالی باشد");
    }else{
        print_error("pass_error", "");
        if (!(email in users))
        {
            print_error("mail_error", "چنین آدرس ایمیلی یا نام کاربری ثبت نشده است");
            return false;
        } else
        {
            print_error("pass_error", "");
            if (!users[email] === password)
            {
                print_error("pass_error", "رمز عبور اشتباه است");
                return false;
            }
        }
    }
    return true;
}