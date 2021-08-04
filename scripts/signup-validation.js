users = {};

function print_error(id, error_text) {
  document.getElementById(id).innerText = error_text;
}

let code = document.register_form.password;
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

function password_strenth() {
  const check_apart = [];
  check_apart.push("[$@$!%*#?&]");
  check_apart.push("[A-Z]");
  check_apart.push("[0-9]");
  check_apart.push("[a-z]");

  let ctr = 0;
  for (let i = 0; i < check_apart.length; i++) {
    if (new RegExp(check_apart[i]).test(code.value)) {
      ctr++;
      console.log(ctr);
    }
  }
  let color = "";
  let strenght = "";
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
  document.getElementById("pass_error").style.color = color;
  document.getElementById("pass_error").innerHTML = strenght;
}

function register_validation(event) {
  event.preventDefault();
  let regex = /^\S+@\S+\.\S+$/;
  let usernameRegex = /^(?=[a-zA-Z_\d]*[a-zA-Z])[a-zA-Z_\d]{5,}$/;

  let name = document.register_form.first_name.value;
  let email = document.register_form.email.value;
  let username = document.register_form.username.value;
  let password = document.register_form.password.value;
  let password_repeat = document.register_form.password_repeat.value;
  let email_exists,
    username_exists,
    relevant_password,
    repeat,
    name_error = false;

  if (users.hasOwnProperty(username)) {
    username_exists = true;
    print_error("username_error", "این نام کاربری قبلا استفاده شده است.");
  } else {
    if (!usernameRegex.test(username)) {
      username_exists = true;
      print_error(
        "username_error",
        "لطفا نام کاربری معتبری وارد کنید (حداقل 5 کاراکتر)"
      );
    } else {
      print_error("username_error", "");
    }
  }

  if (users.hasOwnProperty(email)) {
    email_exists = true;
    print_error("mail_error", "آدرس ایمیل قبلا استفاده شده است.");
  } else {
    if (!regex.test(email)) {
      email_exists = true;
      print_error("mail_error", "لطفا ایمیل معتبری وارد کنید");
    } else {
      print_error("mail_error", "");
    }
  }

  if (document.getElementById("pass_error").style.color === "red") {
    relevant_password = true;
    print_error("pass_error", "امنیت پسورد نباید ضعیف باشد");
  }

  if (!(password === password_repeat)) {
    repeat = true;
    print_error("repeat_error", "رمز عبور مطابقت ندارد");
  } else {
    print_error("repeat_error", "");
  }

  if (
    !(
      email_exists ||
      username_exists ||
      relevant_password ||
      repeat ||
      name_error
    )
  ) {
    users[email] = password;
    document.querySelector(".signup-success").style.display = "block";

    setTimeout(() => {
      window.location.replace("http://127.0.0.1:5500/login.html");
    }, 1000);
  }
  users["1"] = "2";
  console.log(users);
}
