
const toggleMenu = (menu,openClass,closeClass,rightWhenClosed) => {
    if (menu.classList.contains(openClass)) {
      menu.style.right = rightWhenClosed;
      menu.classList.remove(openClass);
      menu.classList.add(closeClass);
    } else {
      menu.classList.add(openClass);
      menu.classList.remove(closeClass);
      menu.style.right = `0px`;
    }
  };
  