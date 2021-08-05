const token = getToken();
const userId = getUser();
const form = document.querySelector('.edit-profile-content form');
const avatar = document.querySelector('.change-avatar-container img');
let userInfo = {};
let editedUserInfo = {};
let formData = new FormData();

triggerPasswordStrength(form.password,'edit-profile-warning-password');
// form.email.addEventListener("keyup", () => {
//   document.getElementById("mail_error").innerHTML = "";
// });
// form.password_repeat.addEventListener("keyup", () => {
//   document.getElementById("repeat_error").innerHTML = "";
// });
// console.log('ssssssssss')

const handleSubmitInfo = async (e)=>{
    e.preventDefault();
    const form = e.target;
    const isError = validateForm(form,'edit-profile-warning-email','edit-profile-warning-username',
    'edit-profile-warning-password','edit-profile-warning-password-repeat');
    if(isError) return;
    // console.log(e.target[6].value.replace(/\//g,'-'));
    editedUserInfo = {
        ...editedUserInfo,
        firstName : form.first_name.value,
        lastName : form.last_name.value,
        username : form.username.value,
        email : form.email.value,
        password : form.password.value,
        gender : true,
        // birthDate : form.birth_date.value.replace(/\//g,'-'),
        birthDate : '2021-08-04',
        token
    }
    for(const property in editedUserInfo){
        formData.append(property, editedUserInfo[property])
      }

      for (var value of formData.values()) {
        // console.log(value);
     }

     const data = new URLSearchParams();
    for (const pair of formData) {
        data.append(pair[0], pair[1]);
    }



    await fetch(`${api}/user/alter`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUserInfo ),
      })
      .then(data => {
          return data;
          })
          .then(res => {
          console.log(res)
          // console.log(data)
          })
      .catch((error) => {
        console.error('Error:', error);
      });
    

}

 /* ------ change avatar ------- */
 const loadAvatar = (e)=>{
   
    const file = e.target.files[0];
    if(e.target.files.length!==0){
      avatar.src = URL.createObjectURL(file);
    }
    let reader = new FileReader();
    reader.onload = (e) => {
    let image = e.target.result;
    console.log(image);
    // console.log(base64_decode(image))
     editedUserInfo = {...editedUserInfo, avatar: image}
    };
    reader.readAsDataURL(file);
    // editedUserInfo = {...editedUserInfo, avatar: btoa(unescape(encodeURIComponent(file)))}

  }

const getProfile = async ()=>{
    
    await fetch(`${api}/user/one/${userId}`)
    .then(data => {
        if(!data.ok){
            alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
            return;
          }
        return data.json();
        })
        .then(res => {
            if(res===undefined) return;
            userInfo = res.user;
            console.log(userInfo)
        })
    .catch((error) => {
        alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
    });

    for(const property in userInfo){
        if(property==='avatar'){
          avatar.src = userInfo[property];
          return;
            // form.avatar.src = userInfo[property];
        }
      form[property].value = userInfo[property]
    }

    
    const elem = document.querySelector('input[name="birth_date"]');
    const datepicker = new Datepicker(elem); 
}

function base64_decode(s) {      
    return decodeURIComponent(escape(atob(s)));
}

// function encodeImageFileAsURL(element) {
//   var file = element.files[0];
//   var reader = new FileReader();
//   reader.onloadend = function() {
//     console.log('RESULT', reader.result)
//   }
//   reader.readAsDataURL(file);
// }

getProfile();   