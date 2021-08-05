window.addEventListener('DOMContentLoaded', () => {
const toggle = document.querySelector(".side-menu-toggle button");
const toggleImg = document.querySelector(".side-menu-toggle button img");
const menu = document.querySelector(".nav-desktop-side");
const openClass = "nav-desktop-side-open";
const closeClass = "nav-desktop-side-closed";
const rightWhenClosed = "-215px";

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

});