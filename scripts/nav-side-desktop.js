
const toggle = document.querySelector('.side-menu-toggle button');
const toggleImg = document.querySelector('.side-menu-toggle button img');
const menu = document.querySelector('.nav-desktop-side');


menu.style.right=`-${215}px`;

const toggleMenu = ()=>{

    if(menu.classList.contains('nav-desktop-side-open')){
        menu.style.right=`-215px`;
        menu.classList.remove('nav-desktop-side-open');
        menu.classList.add('nav-desktop-side-closed');
        toggleImg.style.transform = 'rotateY(0deg)'
      
    }else{
        menu.classList.add('nav-desktop-side-open');
        menu.classList.remove('nav-desktop-side-closed');
        menu.style.right=`0px`;
        toggleImg.style.transform = 'rotateY(180deg)'
    }
}
toggle.addEventListener('click', ()=>{
    toggleMenu();
})

