

const all = document.querySelector('.search-container form #all');
const inputs = document.querySelectorAll('.search-container form input:not(#all)');
all.addEventListener('click', ()=>{
    if(all.checked){
        inputs.forEach(input =>input.checked = false);
    }
})

inputs.forEach(input=>{
    input.addEventListener('click', ()=>{
        if(input.checked){
            all.checked = false;
        }
    })
})