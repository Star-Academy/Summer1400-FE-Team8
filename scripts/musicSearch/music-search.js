

if(!window.location.search){
  window.location.replace('music_search.html?page=1&desc=true&sortBy=artist')
}


// -------------------- API

let data = [];
const box = document.querySelector('.search-results-box');

const descBtn = document.querySelector('.search-filter-mode .form-order input[id="desc"]');
const ascBtn = document.querySelector('.search-filter-mode .form-order input[id="asc"]');
const newestBtn = document.querySelector('.search-filter-mode .form-mode input[id="newest"]');
const nameBtn = document.querySelector('.search-filter-mode .form-mode input[id="name"]');
const artistBtn = document.querySelector('.search-filter-mode .form-mode input[id="artist"]');

let page = window.location.search.split('&')[0].split('=')[1];
let descStr = window.location.search.split('&')[1].split('=')[1];
let sortBy = window.location.search.split('&')[2].split('=')[1];
let searchedContent = window.location.search.split('&')[3] ? window.location.search.split('&')[3].split('=')[1]:null;

let desc = (descStr === 'true');

desc ? descBtn.checked = true : ascBtn.checked = true;
sortBy === 'name' ? nameBtn.checked = true : sortBy==='artist'?artistBtn.checked = true : newestBtn.checked = true;

let songsNum = 0;
let songsInPage = 10;



const handlePagination = (num,className)=>{
  // -------------------- PAGINATION
  const pagesWrapper = document.querySelector('.search-pagination');
 //  let num = searchedContent ? songsNum : 10;
   if(className === 'link-all'){
     document.querySelectorAll('.link-search').forEach(i=>{
       i.style.display='none'
     })
   }else{
     document.querySelectorAll('.link-all').forEach(i=>{
       i.style.display='none'
     })
   }
  // ---- init pages buttons
  let pagesNum  = Math.round(num / songsInPage);
  for(let i = 1; i <= pagesNum; i++){
    const link = document.createElement('A');
    link.classList.add('btn');
    link.classList.add('btn--gray');
    link.classList.add(className);
    link.innerHTML=i;
     pagesWrapper.appendChild(link)
  }

 //  redirect to another page
 const links = document.querySelectorAll('.search-pagination a');
  links.forEach(link=>{
   link.addEventListener('click', ()=>{
     let pageNum = link.innerText;

     setParams('page',pageNum)

    //  if(searchedContent){
    //    window.location.replace(`music_search.html?page=${pageNum}&desc=${desc}&sortBy=${sortBy}&searched=${searchedContent}`)
    //  }else{
    //    window.location.replace(`music_search.html?page=${pageNum}&desc=${desc}&sortBy=${sortBy}`)
    //  }
    
   })
 })
 
 // -------- change current page btn style
 links.forEach(link=>{
     let elm;
     if(link.innerText===page){
      elm = link;
     }
       link.classList.remove('btn--blue');
       link.classList.add('btn--gray');
   if(elm){  
     const next1 = elm.nextElementSibling;
     const prev1 = elm.previousElementSibling;
     const next2 = next1 ? next1.nextElementSibling : null;
     const prev2 = prev1 ? prev1.previousElementSibling : null;
     const next3 = next2 ? next2.nextElementSibling : null;
     const prev3 = prev2 ? prev2.previousElementSibling:null;
     const next4 = next3 ? next3.nextElementSibling : null;
     const prev4 = prev3 ? prev3.previousElementSibling:null;
     const elms = {elm,next1,prev1,next2,prev2,next3,prev3,next4,prev4};
     
     links.forEach(link=>{
       link.style.display = 'none';  
     })
     console.log()
     for(const prop in elms){
       if(elms[`${prop}`]){
         // console.log(elm[prop])
         elms[`${prop}`].style.display = 'inline-block';
       }
     }
     elm.classList.add('btn--blue')
     elm.classList.remove('btn--gray')
   }
 })

 // ----- backward and forward btns
 const backwardBtn = document.querySelector('.search-pagination-backward');
 const forwardBtn = document.querySelector('.search-pagination-forward');
 // console.log(forwardBtn)
 backwardBtn.addEventListener('click',()=>{
  setParams('page',1)

  //  window.location.replace(`music_search.html?page=${1}&desc=${desc}&sortBy=${sortBy}`);
 })
 forwardBtn.addEventListener('click',()=>{
  setParams('page',pagesNum)
  //  window.location.replace(`music_search.html?page=${pagesNum}&desc=${desc}&sortBy=${sortBy}`)
 })

}


 // ------------- CHANGE ITEMS ORDER
 
 // descending or ascending
 ascBtn.addEventListener('click',(event)=>{
   if(event.target.checked){
    //  window.location.replace(`music_search.html?page=1&desc=false&sortBy=${sortBy}`);
     setParams('desc',false)
   }
 })
 descBtn.addEventListener('click',(event)=>{
   if(event.target.checked){
    //  window.location.replace(`music_search.html?page=1&desc=true&sortBy=${sortBy}`);
     setParams('desc',true)
   }
 })

 // mode
 newestBtn.addEventListener('click',(event)=>{
   if(event.target.checked){
    //  window.location.replace(`music_search.html?page=1&desc=${desc}&sortBy=newest`);
     setParams('sortBy','newest')
   }
 })
 nameBtn.addEventListener('click',(event)=>{
   if(event.target.checked){
    //  window.location.replace(`music_search.html?page=1&desc=${desc}&sortBy=name`);
     setParams('sortBy','name')
   }
 })
 artistBtn.addEventListener('click',(event)=>{
   if(event.target.checked){
    //  window.location.replace(`music_search.html?page=1&desc=${desc}&sortBy=artist`);
     setParams('sortBy','artist')
   }
 })






/* ------------- REPRESENT ALL THE SONGS ------------- */
if(!searchedContent){
  
const getSongs = async ()=>{

  await fetch(`${api}/song/all`)
  .then(data => {
      return data.json();
      })
      .then(song => {
        songsNum = song.songs.length;
      })
  .catch((error) => {
    console.error('Error:', error);
  });


  // await fetch(`${api}/song/all`)
  await fetch(`${api}/song/page`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      size: songsInPage,
      current:page,
      sorter: sortBy,
      desc: desc
    }),
  })
  .then(data => {
      return data.json();
      })
      .then(song => {
      data = song;
      // console.log(data)
      })
  .catch((error) => {
    console.error('Error:', error);
  });
  
   const songs = data.songs;

  if(!searchedContent){
    box.innerHTML = songs.map(song => {
      return(`
          <a href="player.html?song_id=${song.id}">
              <div class="search-results-box-item" onClick="window.location.replace('player.html')">
              <div class="search-results-box-item-pic">
              <img src=${song.cover} alt="cover" />
              </div>
              <div class="search-results-box-item-text">
              <h5>${song.artist}</h5>
              <h4>${song.name}</h4>
              </div>
              <div class="search-results-box-item-play">
              <button></button>
              </div>
              </div>
          </a>
      `)
   })

   box.innerHTML = box.innerHTML.replace(/,/g, '')

   handlePagination(songsNum,'link-all');
  }

  


}

getSongs();

}


/* ------------- REPRESENT SONGS RELATED TO SEARCHED CONTENT ------------- */

// ---------------- SEARCH MUSIC

let searchData = [];
const searchBtn = document.querySelector('main.search-container ');
const handleSearch = async (event) => {
  event.preventDefault();
  const val = event.target[1].value;
  setParams('searched',val,'page',1);
}

if(searchedContent){
  const showSearchedContent = async ()=>{
    
      let searched = decodeURI(searchedContent)
     await fetch(`${api}/song/find`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phrase : searched,
          count: 100,
          sorter: sortBy,
          desc: desc
        }),
      })
      .then(data => {
          return data.json();
          })
          .then(res => {
            // console.log(res)
            searchData = res.songs;
          
          
          // window.location.reload();
          // window.history.replaceState(null, null, `${state}&searched=${val}`);
          })
      .catch((error) => {
        console.error('Error:', error);
      });
      
      
      const divider = (page)=>{
        let start = 0;
        let end = 9;
        start += (parseInt(page)-1)*10;
        end += parseInt(page)*10;
        return{
          start,end
        }
      }
      let start = divider(getParams('page')).start;
      let end = divider(getParams('page')).end;
      // divider(getParams(page))
      box.innerHTML = searchData.slice(start,end).map(song=>{
        return(`
              <a href="player.html?song_id=${song.id}">
                  <div class="search-results-box-item" onClick="window.location.replace('player.html')">
                  <div class="search-results-box-item-pic">
                  <img src=${song.cover} alt="cover" />
                  </div>
                  <div class="search-results-box-item-text">
                  <h5>${song.artist}</h5>
                  <h4>${song.name}</h4>
                  </div>
                  <div class="search-results-box-item-play">
                  <button></button>
                  </div>
                  </div>
              </a>
          `)
      })
      box.innerHTML = box.innerHTML.replace(/,/g, '');
      
      handlePagination(searchData.length,'link-search');
      // window.location.reload()
    
  }
  
  showSearchedContent();
  
}



// ---------------- FILTER CHECKBOX 
const all = document.querySelector('.search-container form #all');
const inputs = document.querySelectorAll('.search-container form.form-genre input:not(#all)');
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