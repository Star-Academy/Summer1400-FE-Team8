
const container = document.querySelector('.signup-alert-container');
const box = document.querySelector('.signup-alert-box');

container.addEventListener('click', (e)=>{
   if(e.target.closest('.signup-alert-box')) return ;
   box.style.opacity ='0'
   setTimeout(() => {
      container.style.display = 'none';
   }, 300)
})

// container.style.display = 'flex';
// setTimeout(() => {
//     box.style.opacity ='100'
// }, 1)