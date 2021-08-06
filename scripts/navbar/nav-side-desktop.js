const navSideDesktop =async ()=>{
const userId = getUser();    
const toggle = document.querySelector(".side-menu-toggle button");
const toggleImg = document.querySelector(".side-menu-toggle button img");
const menu = document.querySelector(".nav-desktop-side");
const openClass = "nav-desktop-side-open";
const closeClass = "nav-desktop-side-closed";
const rightWhenClosed = "-215px";
const avatar = document.querySelector('.nav-desktop-side .side-menu-avatar-container img');

// if(!isLogged()){
//     menu.style.display='none'
// }else{
//     menu.style.display='block';

//     await fetch(`${api}/user/one/${userId}`)
//     .then(data=>data.json())
//     .then(res=>{
//       if(!res.user.avatar) return;
//       avatar.src = res.user.avatar
//     })
//     .catch(err=>{
//       console.log(err)
//     })
// }


menu.style.right = rightWhenClosed;

const toggleImgMove = () => {
  if (menu.classList.contains(openClass)) {
    toggleImg.style.transform = "rotateY(0deg)";
  } else {
    toggleImg.style.transform = "rotateY(180deg)";
  }
};

toggle.addEventListener("click", () => {
  toggleImgMove();
  toggleMenu(menu, openClass, closeClass, rightWhenClosed);
});

// ------ logout button
const logoutBtn = document.querySelector('.nav-desktop-side-logout a');

logoutBtn.addEventListener('click', ()=>{
    removeUserLocal();
    window.location.replace('/home.html')
})

}

navSideDesktop();