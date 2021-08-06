
const token = getToken();
if(token ==='undefined' || !token){
  window.location.replace('/login.html')
}

  const removeFromPlaylist = async (playlistId,songId) => {
    await fetch(`${api}/playlist/remove-song`, {
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


  let comma = 'aaaaaaaa'
  const container = document.querySelector('main.favorites-container .favorites');
  const nameWrapper = document.querySelector('main.favorites-container h1');
  let songsList = [];
  let playlistName = '';
  let id = getParams('id');

  const getPlaylist = async ()=>{
    await fetch(`http://130.185.120.192:5000/playlist/one/${id}`)
      .then(data => {
          return data.json();
          })
          .then(res => {
            songsList = res.songs;
            playlistName = res.name;
          })
      .catch((error) => {
        alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
      });

      nameWrapper.innerText = playlistName;
      const text = songsList.map(song=>{
          return (`
              <div class="favorites-box-item" data-id="${song.id}">
              <div class="favorites-box-item-pic">
                <img src="${song.cover}" alt="cover" />
              </div>
              <div class="favorites-box-item-text">
                <h6>${song.artist}</h6>
                <h5>${song.name}</h5>
              </div>
              <div class="favorites-box-item-play">
                <a href="player.html?song_id=${song.id}">
                  <button></button>
                </a>
              </div>
              <div class="favorites-box-item-delete">
                <img onclick="removeFromPlaylist(${id},${song.id})" src="assets/images/favorites/delete.svg" alt="delete" />
              </div>
            </div>
          `)
    })
    container.innerHTML = text.join(' ')
    document.title = playlistName;

    // ---------- ASSIGN NONE DISPLAY TO PARENT OF CLICKED DELETE BTN
    document.querySelectorAll('main.favorites-container .favorites-box-item-delete img').forEach(item=>{
      // console.log(item)
        item.addEventListener('click', e =>{
          const box = e.target.parentElement.parentElement;
          box.style.display = 'none';
        })
    })

    // ---------- REDIRECT TO SPECIFIC PLAYLIST PAGE

    const songs = document.querySelectorAll('main.favorites-container .favorites-box-item');

    songs.forEach(song=>{
      const id = song.getAttribute('data-id');
      song.addEventListener('click', (e)=>{
        if(e.target.closest('main.favorites-container .favorites-box-item-delete img')) return;
        window.location.href = (`player.html?song_id=${id}`)
      })
    })
  }

  getPlaylist();