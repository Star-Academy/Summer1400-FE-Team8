users = {}

document.login_form.email.addEventListener("keyup" , ()=>{

   document.getElementById("mail_error").innerHTML = "";
});

function print_error(id, error_text)
{
    document.getElementById(id).innerText = error_text
}

function login_validation()
{
    let email = document.login_form.email.value
    let password = document.login_form.password.value

    if (!(email in users))
    {
        print_error("mail_error", "چنین آدرس ایمیلی ثبت نشده است");
        return false;
    } else
    {
        print_error("pass_error", "");
        if (!users[email] === password)
        {
            print_error("error1", "رمز عبور اشتباه است");
            return false;
        }
    }
    return true;
}