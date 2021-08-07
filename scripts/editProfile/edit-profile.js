const token = getToken();
const userId = getUser();
const form = document.querySelector('.edit-profile-content form');
const avatar = document.querySelector('.change-avatar-container img');
let userInfo = {};
let editedUserInfo = {};

triggerPasswordStrength(form.password,'pass_error');
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
    const isError = validateForm(form);
    if(isError) return;
    const b = form.birth_date.value.replace(/\//g,'-').split('-').reverse();
    let temp
    temp= b[1];
    b[1] = b[2];
    b[2] = temp;
    const birthDate = b.join('-');
    editedUserInfo = {
        ...editedUserInfo,
        firstName : form.first_name.value,
        lastName : form.last_name.value,
        username : form.username.value,
        email : form.email.value,
        password : form.password.value,
        gender : parseInt(form.gender.value),
        birthDate: birthDate ==='--'?null:birthDate,
        token
    }


    await fetch(`${api}/user/alter`, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': '*/*',
          'Content-Type': 'application/json',
          

        },
        body: JSON.stringify(editedUserInfo ),
      })
      .then(data => {
          return data;
          })
          .then(res => {
          // console.log(res);
          // console.log(data);
          window.location.reload();
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
    // form.gender.value = userInfo.gender.toString();
    // form.birth_date.placeholder =  userInfo.birth_date.substr(0,6)
    for(const property in userInfo){
        if(property==='avatar'){
          if(userInfo[property]) avatar.src = userInfo[property];
        }else if(property==='gender'){
          if(userInfo[property]) form.gender.value = userInfo.gender.toString();
        }else if(property==='birth_date'){
         if(userInfo[property]){
          form.birth_date.placeholder = userInfo.birth_date.substr(0,10).split('-').reverse().join('/');
         }
        }else{
          form[property].value = userInfo[property]
        }
        
      
    }
    // form.gender.value = userInfo.gender.toString();
      
    
    const elem = document.querySelector('input[name="birth_date"]');
    const datepicker = new Datepicker(elem); 
}



getProfile();   