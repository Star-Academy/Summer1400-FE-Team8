const validateForm = (form)=>{
    let emailRegex = /^\S+@\S+\.\S+$/;
    let usernameRegex = /^(?=[a-zA-Z_\d]*[a-zA-Z])[a-zA-Z_\d]{5,}$/;
    const errorIds = {
        emailErrorId : "mail_error",
        usernameErrorId:"username_error",
        passErrorId:"pass_error",
        repeatPassErrorId:"repeat_error"
    }
    let email_error,username_error,password_error,repeat_error = false;
    const error = {
        email_error:false,username_error:false,password_error:false, repeat_error:false,
        check : function(){
            return this.email_error || this.username_error || this.password_error || this.repeat_error;
        }
    }

    if(form.email){
        if (!emailRegex.test(form.email.value))
        {
            error.email_error = true;
            print_error(errorIds.emailErrorId, "لطفا ایمیل معتبری وارد کنید")
        } else
        {
            print_error(errorIds.emailErrorId, "")
        }
    }
    if(form.username){
        if (!usernameRegex.test(form.username.value))
        {
            error.username_error = true;
            print_error(errorIds.usernameErrorId, "لطفا نام کاربری معتبری وارد کنید (حداقل 5 کاراکتر)")
        } else
        {
            print_error(errorIds.usernameErrorId, "")
        }
    }
    if(form.password){
        // checkPasswordStrength(form.password,passErrorId);
       

        if (document.getElementById(errorIds.passErrorId).style.color === "red")
        {
        error.password_error = true;
        print_error(errorIds.passErrorId, "امنیت پسورد نباید ضعیف باشد");
        }else{
            print_error(errorIds.passErrorId, "");
        }
    }
    if(form.repeat_password){
        // console.log(form.password.value,form.repeat_password.value)
        if (!(form.password.value === form.repeat_password.value))
        {
            error.repeat_error = true;
            print_error(errorIds.repeatPassErrorId, "رمز عبور مطابقت ندارد")
        } else
        {
            print_error(errorIds.repeatPassErrorId, "")
        }
    }

    console.log(error)
    return error.check();
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
        }
    }
    let color = ""
    let strength = "";
   
    if (code.value.length >= 4)
    {
        if (ctr <= 2)
        {
            color = "red";
            strength = "امنیت : ضعیف";
        }
        else if (ctr === 3)
        {
            color = "orange";
            strength = "امنیت : متوسط";
        }
        else if (ctr === 4)
        {
            color = "green";
            strength = "امنیت : قوی";
        }
    }
    else
    {
        color = "red";
        strength = "";
    }
    document.getElementById(pass_error).style.color = color;
    document.getElementById(pass_error).innerHTML = strength;
}

