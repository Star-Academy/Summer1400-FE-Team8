const validateForm = (form,emailErrorId,usernameErrorId,passErrorId,repeatPassErrorId)=>{
    let emailRegex = /^\S+@\S+\.\S+$/;
    let usernameRegex = /^(?=[a-zA-Z_\d]*[a-zA-Z])[a-zA-Z_\d]{5,}$/;
    let email_error,username_error,password_error,repeat_error = false;

    if(form.email){
        if (!emailRegex.test(form.email.value))
        {
            email_error = true;
            print_error(emailErrorId, "لطفا ایمیل معتبری وارد کنید")
        } else
        {
            print_error(emailErrorId, "")
        }
    }
    if(form.username){
        if (!usernameRegex.test(form.username.value))
        {
            username_error = true;
            print_error(usernameErrorId, "لطفا نام کاربری معتبری وارد کنید (حداقل 5 کاراکتر)")
        } else
        {
            print_error(usernameErrorId, "")
        }
    }
    if(form.password){
        // checkPasswordStrength(form.password,passErrorId);
       

        if (document.getElementById(passErrorId).style.color === "red")
        {
        password_error = true;
        print_error(passErrorId, "امنیت پسورد نباید ضعیف باشد");
        }
    }
    if(form.repeat_password){
        console.log(form.password.value,form.repeat_password.value)
        if (!(form.password.value === form.repeat_password.value))
        {
            repeat_error = true;
            print_error(repeatPassErrorId, "رمز عبور مطابقت ندارد")
        } else
        {
            print_error(repeatPassErrorId, "")
        }
    }

    return email_error || username_error || password_error || repeat_error;
}


const triggerPasswordStrength = (passwordElm,passErrorId)=>{
    passwordElm.addEventListener("keyup",()=>{
        checkPasswordStrength(passwordElm,passErrorId)
    });
}

const print_error = (id, error_text) =>{
    document.getElementById(id).innerText = error_text
}

const checkPasswordStrength = (code,pass_error)=>{
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
    let strenght = "";
   
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
    document.getElementById(pass_error).style.color = color;
    document.getElementById(pass_error).innerHTML = strenght;
}

