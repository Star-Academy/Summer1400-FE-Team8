
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
      
      const template = document.querySelector('main.favorites-container template[name="component-favorites-box-item"]')
      songsList.map(song=>{
        const clone = template.content.cloneNode(true);
        clone.querySelector(".favorites-box-item").setAttribute("data-id",`${song.id}`);
        clone.querySelector(".favorites-box-item-pic img").src = `${song.cover}`;
        clone.querySelector(".favorites-box-item-text h5").innerText = `${song.name}`;
        clone.querySelector(".favorites-box-item-text h6").innerText = `${song.artist}`;
        clone.querySelector(".favorites-box-item-play a").href = `player.html?song_id=${song.id}`;
        clone.querySelector(".favorites-box-item-delete img").addEventListener("click", ()=>removeFromPlaylist(id,song.id))
        container.appendChild(clone)
        return (clone)
    })
    document.title = playlistName;

    // ---------- ASSIGN NONE DISPLAY TO PARENT OF CLICKED DELETE BTN
    document.querySelectorAll('main.favorites-container .favorites-box-item-delete img').forEach(item=>{
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