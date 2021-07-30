users = {}

function print_error(id, error_text) {
    document.getElementById(id).innerText = error_text
}

var code = document.register_form.password;
code.addEventListener("keyup", password_strenth);
document.register_form.email.addEventListener("keyup", () => {
    document.getElementById("mail_error").innerHTML = "";
});
document.register_form.password_repeat.addEventListener("keyup", () => {
    document.getElementById("repeat_error").innerHTML = "";
});
document.register_form.name.addEventListener("keyup", () => {
    document.getElementById("name_error").innerHTML = "";
});
const check_apart = [];
check_apart.push("[$@$!%*#?&]");
check_apart.push("[A-Z]");
check_apart.push("[0-9]");
check_apart.push("[a-z]");

function password_strenth()
{
    let ctr = 0;
    for (let i = 0; i < check_apart.length; i++)
    {
        if (new RegExp(check_apart[i]).test(code.value))
        {
            ctr++;
            console.log(ctr)
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


function register_validation() {
    let regex = /^\S+@\S+\.\S+$/;

    let name = document.register_form.name.value;
    let email = document.register_form.email.value;
    let password = document.register_form.password.value;
    let password_repeat = document.register_form.password_repeat.value;
    let email_exists, relevant_password, repeat, name_error = false;

    if (name === "")
    {
        name_error = true;
        print_error("name_error", "فیلد نام نباید خالی باشد");
    }

    if (users.hasOwnProperty(email))
    {
        email_exists = true;
        print_error("mail", "آدرس ایمیل قبلا استفاده شده است.")
    }
    else
    {
        if (!regex.test(email))
        {
            email_exists = true;
            print_error("mail_error", "لطفا ایمیل معتبری وارد کنید")
        } else
        {
            print_error("mail_error", "")
        }
    }

    if (document.getElementById("pass_error").style.color === "red")
    {
        relevant_password = true;
        print_error("pass_error", "امنیت پسورد نباید ضعیف باشد");
    }

    if (!(password === password_repeat))
    {
        repeat = true;
        print_error("repeat_error", "رمز عبور مطابقت ندارد")
    } else
    {
        print_error("repeat_error", "")
    }

    if (!(email_exists || relevant_password || repeat || name_error))
    {
        users[email] = password;
        return true;
    }
    users["1"] = "2";
    console.log(users);
    return false;

}
