
const container = document.querySelector('.signup-alert-container');
const box = document.querySelector('.signup-alert-box');

container.addEventListener('click', (e)=>{
   if(e.target.closest('.signup-alert-box')) return ;
   container.style.display = 'none';
})

// container.style.display = 'flex';
// setTimeout(() => {
//     box.style.opacity ='100'
// }, 1)