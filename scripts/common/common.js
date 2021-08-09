// return the user data from the local storage
const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }

// return the user data from the local storage
const getEmail = () => {
  const emailStr = localStorage.getItem('email');
  if (emailStr) return JSON.parse(emailStr);
  else return null;
}
   
  // return the token from the local storage
  const getToken = () => {
    return localStorage.getItem('token') || null;
  }

  // return the expiry from the local storage
  const checkExpiry = () => {
    return new Date(localStorage.getItem('expiry')) > new Date();
  }
  const setExpiry = (date) => {
    const expiry = new Date(date.getTime()+(10*(86400000)));
    localStorage.setItem('expiry',expiry);
  }

  
  // remove the token and user from the local storage
  const removeUserLocal = () => {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
  }
   
  // set the token and user from the local storage
  const setUserLocal = (token,user) => {
   localStorage.setItem('token', token);
   localStorage.setItem('user', JSON.stringify(user));
  }

  // check token expiry

  if(!checkExpiry()){
    removeUserLocal();
  }

  const isLogged = ()=>{
      if(getToken()){
        return true;
      }
      return false;
  }

  // api
  const api = 'http://130.185.120.192:5000';

  // get & set URL params
  const setParams = (name,val,name2,val2)=>{
    const state = window.location.search;
    const urlParams = new URLSearchParams(state);
    urlParams.set(name,val);
    if(name2){
      urlParams.set(name2,val2);
    }
    window.location.search = urlParams;
  }
  const getParams = (name)=>{
    const state = window.location.search;
    const urlParams = new URLSearchParams(state);
    return urlParams.get(name);
  }
  