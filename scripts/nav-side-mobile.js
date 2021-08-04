
const toggle = document.querySelector('.nav-mobile-main-toggle');
const menu = document.querySelector('.nav-mobile-side');
const black_page = document.querySelector('.side-menu-black-page');

menu.style.right=`-400px`;

const toggleMenu = ()=>{
    if(menu.classList.contains('nav-mobile-side-open')){
        menu.style.right=`-400px`;
        menu.classList.remove('nav-mobile-side-open');
        menu.classList.add('nav-mobile-side-closed');
        black_page.style.display='none';
    }else{
        menu.classList.add('nav-mobile-side-open');
        menu.classList.remove('nav-mobile-side-closed');
        menu.style.right=`0px`;
        black_page.style.display='block';
    }
}
toggle.addEventListener('click', ()=>{
    toggleMenu();
})

black_page.addEventListener('click', ()=>{
    toggleMenu();
})