users = {}

var code = document.editing_form.password;
code.addEventListener("keyup", password_strenth);

const check_apart = [];
check_apart.push("[$@$!%*#?&]");
check_apart.push("[A-Z]");
check_apart.push("[0-9]");
check_apart.push("[a-z]");

const dels = document.querySelectorAll(".custom-input");
const erss = document.querySelectorAll(".erss");

for (let i = 0; i < dels.length; i++) {
    dels[i].addEventListener("keyup" , ()=>{
        if(i!==3)
        erss[i].innerHTML="";
    });
}


function print_error(id, error_text) {
    document.getElementById(id).innerText = error_text
}

function editing_validation() {
    let regex = /^\S+@\S+\.\S+$/;
    let fname = document.editing_form.fname.value;
    let lname = document.editing_form.lname.value;
    let email = document.editing_form.email.value;
    let password = document.editing_form.password.value;
    let password_repeat = document.editing_form.repeat_password.value;
    let birthday = document.editing_form.birthday.value;
    let email_exists, relevant_password, repeat, name_error, birthday_error = false;

    if (birthday === "") {
        birthday_error = true;
        print_error("birthday", 'تاریخ تولد نباید خالی باشد');
    }

    if (fname === "") {
        name_error = true;
        print_error("f_name", "فیلد نام نباید خالی باشد");
    }
    if (lname === "") {
        name_error = true;
        print_error("l_name", "فیلد نام خانوادگی نباید خالی باشد");
    }

    if (users.hasOwnProperty(email)) {
        email_exists = true;
        print_error("email", "آدرس ایمیل قبلا استفاده شده است.")
    } else {
        if (!regex.test(email)) {
            email_exists = true;
            print_error("email", "لطفا ایمیل معتبری وارد کنید")
        } else {
            print_error("email", "")
        }
    }

    if (document.getElementById("password").style.color === "red") {
        relevant_password = true;
        print_error("password", "امنیت پسورد نباید ضعیف باشد");
    }

    if (!(password === password_repeat)) {
        repeat = true;
        print_error("password_repeat", "رمز عبور مطابقت ندارد")
    } else {
        print_error("password_repeat", "")
    }

    if (!(email_exists || relevant_password || repeat || name_error || birthday_error)) {
        users[email] = password;
        return true;
    }
    users["1"] = "2";
    console.log(users);
    return false;

}

function password_strenth() {
    let ctr = 0;
    for (let i = 0; i < check_apart.length; i++) {
        if (new RegExp(check_apart[i]).test(code.value)) {
            ctr++;
            console.log(ctr)
        }
    }
    let color = ""
    let strenght = ""
    if (code.value.length >= 4) {
        if (ctr <= 2) {
            color = "red";
            strenght = "امنیت : ضعیف";
        } else if (ctr === 3) {
            color = "orange";
            strenght = "امنیت : متوسط";
        } else if (ctr === 4) {
            color = "green";
            strenght = "امنیت : قوی";
        }
    } else {
        color = "red";
        strenght = "";
    }
    document.getElementById("password").style.color = color;
    document.getElementById("password").innerHTML = strenght;
}
