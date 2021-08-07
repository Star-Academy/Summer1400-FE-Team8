const token = getToken();

if(token ==='undefined' || !token){
  window.location.replace('/login.html')
}


const container = document.querySelector('main.playlists-container .playlists');
let allPlaylists = [];

const getPlaylists = async () => {
    await fetch(`${api}/playlist/all`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token
        }),
      })
      .then(data => {
          return data.json(); 
          })
          .then(res => {
            allPlaylists =res ;
            // console.log(res[0].songs[0].rest.cover)
          })
      .catch((error) => {
        // alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
      });
      container.innerHTML = allPlaylists.map(playlist=>{
            return (`
                <div class="playlists-item" data-id="${playlist.id}">
                <div class="playlists-item-pic">
                <a href="playlist.html?id=${playlist.id}"
                    ><img src="${playlist.songs[0] ? playlist.songs[0].rest.cover : "assets/images/playlists/no-cover.jpg"} " alt="cover"
                /></a>
                </div>
                <div class="playlists-item-actions">
                <div class="playlists-item-text">
                    <h4>
                    <a href="playlist.html?id=${playlist.id}">${playlist.name}</a>
                    </h4>
                </div>
                <div class="icons-container">
                    <div class="playlists-item-play">
                    <a href="player.html">
                        <button></button>
                    </a>
                    </div>
                    <div class="playlists-item-delete">
                    <img onclick="deletePlaylist(${playlist.id})" src="assets/images/favorites/delete.svg" alt="delete" />
                    </div>
                </div>
                </div>
            </div>
            `)
      })
      container.innerHTML = container.innerHTML.replace(/,/g, '');


      // assign none display to parent of clicked delete btn
      document.querySelectorAll('.playlists-item-delete img').forEach(item=>{
        // console.log(item)
          item.addEventListener('click', e =>{
            const box = e.target.parentElement.parentElement.parentElement.parentElement
            box.style.display = 'none';
          })
      })

      // ---------- REDIRECT TO SPECIFIC PLAYLIST PAGE

      const playlists = document.querySelectorAll('main.playlists-container .playlists-item');

      playlists.forEach(playlist=>{
        const id = playlist.getAttribute('data-id');
        playlist.addEventListener('click', (e)=>{
          if(e.target.closest('.playlists-item-delete img')) return;
          window.location.href = (`playlist.html?id=${id}`)
        })
      })

      // addToPlaylist(83,575);

}

const createPlaylist = async (name)=>{
    await fetch(`${api}/playlist/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          name
        }),
      })
      .then(data => {
          return data.json();
          })
          .then(res => {
            window.location.reload();
          })
      .catch((error) => {
       alert('خطایی رخ داد. لطفا دوباره سعی کنید.')
      });
}

const deletePlaylist = async (id)=>{
    await fetch(`${api}/playlist/remove`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          id
        }),
      })
      .then(data => {
        //   return data.json();
          })
          .then(res => {
        //  console.log(res)
          // console.log(data)
          })
      .catch((error) => {
        console.error('Error:', error);
      });
}

const getOnePlaylist = async (id) => {
    await fetch(`${api}/playlist/one/${id}`)
      .then(data => {
          return data.json();
          })
          .then(res => {
         console.log(res)
          // console.log(data)
          })
      .catch((error) => {
        console.error('Error:', error);
      });
}

const addToPlaylist = async (playlistId,songId) => {
    await fetch(`${api}/playlist/add-song`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          playlistId,
          songId
        }),
      })
      .then(data => {
          return data;
          })
          .then(res => {
         console.log(res)
          // console.log(data)
          })
      .catch((error) => {
        console.error('Error:', error);
      });
}



getPlaylists();


// --------- CREATE PLAYLIST PAGE
const createBtn = document.querySelector('main.playlists-container .create-playlist-btn');
const createPage = document.querySelector('main.playlists-container .create-playlist-page');
const createBox = document.querySelector('main.playlists-container .create-playlist-page-box ');
const createInput = document.querySelector('main.playlists-container .create-playlist-input input[type="text"]');

createBtn.addEventListener('click', ()=>{
  createPage.style.display = 'flex';
  createInput.focus();
  setTimeout(() => {
    createBox.style.transform = 'scale(1)'
  }, 1)
})

createPage.addEventListener('click', (e)=>{
  if(e.target.closest('main.playlists-container .create-playlist-page-box')) return;
  createBox.style.transform='scale(.1)'
  setTimeout(() => {
    createPage.style.display='none';
  }, 350)
})

const handleSubmit = (e) => {
  e.preventDefault();
  const name = e.target[0].value
  if(name){
      createPlaylist(name);
      createBox.style.transform='scale(.1)'
      setTimeout(() => {
        createPage.style.display='none';
      }, 350)
      
  }else{
    alert('لطفا یه نام برای پلی لیست جدید انتخاب کن')
  }

}


