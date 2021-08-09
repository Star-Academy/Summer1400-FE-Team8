const navTopDesktop = ()=>{
    
const loggedOutItems = document.querySelectorAll('.nav-menu-item-loggedout');


loggedOutItems.forEach(item => {
    if(isLogged()){
        item.style.display = 'none';
    }else{
        item.style.display = 'initial';
    }
   
})


// const queryString = window.location.search;
// let params = new URLSearchParams(queryString);
// params.set('baz', 3);
//  // "foo=1&bar=2&baz=3"
// console.log(params.get('baz'));    
}

navTopDesktop();