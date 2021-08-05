const toggle = document.querySelector(".nav-mobile-main-toggle");
const menu = document.querySelector(".nav-mobile-side");
const black_page = document.querySelector(".side-menu-black-page");
const openClass = "nav-mobile-side-open";
const closeClass = "nav-mobile-side-closed";
const rightWhenClosed = "-400px";

menu.style.right = rightWhenClosed;

const toggleBlackPage = () => {
  if (menu.classList.contains(openClass)) {
    black_page.style.display = "none";
  } else {
    black_page.style.display = "block";
  }
};

toggle.addEventListener("click", () => {
  toggleBlackPage();
  toggleMenu(menu, openClass, closeClass, rightWhenClosed);
});

black_page.addEventListener("click", () => {
  toggleBlackPage();
  toggleMenu(menu, openClass, closeClass, rightWhenClosed);
});

// change domain for github pages
document.querySelectorAll(`a`).forEach(item=>{
  const href = item.getAttribute("href");
  if(!href.includes('Summer1400-FE-Team8')){
    item.setAttribute('href', `/Summer1400-FE-Team8${href}`)
  }
})
