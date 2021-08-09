const token = getToken();
let songs = []

Process();

async function getData(id) {
    let response = await fetch('http://130.185.120.192:5000/song/all');
    let current = await fetch(`http://130.185.120.192:5000/song/one/${id}`)
    if (response.ok && current.ok)
    {
        await response.json().then((song)=>{
            songs = song.songs;
        });
        let song = await current.json();
        return await song.song;
    } else if (response.status === 500) {
        console.log("server error");
    }
}

async function Process()
{
    

    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    let l = params.length;
    for (let i = 0; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    let current_song = await getData(data.song_id);

    const res = songs.filter(song =>
        song.artist === current_song.artist
    );





    Load_current_musics_Base();
    
    display_recommends(res);
    

    let heart_btn = document.querySelector(".song-interact > .song-interact-like > button")
    let song_like = document.querySelector(".song-interact-like > span");
    let favorite_bar = document.querySelector(".song-interact-favorite");
    // let btn_favorite = favorite_bar.querySelector("button");
    let info_btn = document.querySelector(".details-buttons-info");
    let lyrics_btn = document.querySelector(".details-buttons-lyrics");
    let info_container = document.querySelector(".info_container");
    let infos = info_container.querySelectorAll(".info_container p > span")
    let lyrics_container = document.querySelector(".lyrics-container");
    const items = document.querySelectorAll(".playlist-box-item");
    let Next = document.querySelector("#next");
    let Prev = document.querySelector("#prev");
    let current_track = document.createElement("audio");
    let left_btns = document.querySelectorAll(".song-play-bottom-left > button");
    let PlayPause = document.querySelector("#play-pause");
    let PlayRange = document.querySelector(".play-range > .custom-range-slider");
    let volume_range = document.querySelector(".volume-range-wrapper > .custom-range-slider");
    const alert_container = document.querySelector(".signup-alert-container");
    const alert_container_box = document.querySelector(".signup-alert-container .signup-alert-box");
    let play_list = false;
    let isPlaying = false;

    const current_in_recommands  = (element) => element.id === current_song.id;
    let recommand_index = res.findIndex(current_in_recommands);



    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function (e) {
            if(e.target.closest('.playlist-box-item-add button')) return;
            window.location.href = 'player.html?song_id=' + encodeURIComponent((res[i].id).toString());
        });
    }

    InfoLyrics_Settings();
    const detailsBox = document.querySelector(".song-more-details .details-box");
    info_btn.addEventListener("click", () => {
        detailsBox.style.height = "10rem";
        detailsBox.style.overflow = "hidden"
        lyrics_container.style.visibility = "hidden";
        info_container.style.visibility = "visible";
        info_btn.style.backgroundColor = "#33538b";
        lyrics_btn.style.backgroundColor = "#486fb4";

    });
    lyrics_btn.addEventListener("click", () => {
        detailsBox.style.height = "30rem"
        detailsBox.style.overflow = "auto"
        info_container.style.visibility = "hidden";
        lyrics_container.style.visibility = "visible";
        lyrics_btn.style.backgroundColor = "#33538b";
        info_btn.style.backgroundColor = "#486fb4";
    });


    if (token)
    {
        load_track(data.song_id);

        

      
        
        // add or remove from play_list

        // *****************************************************************************************************************

       



       

        Next.addEventListener("click", () => {
            NextTrack();
        });

        Prev.addEventListener("click", () => {
            PrevTrack();
        });
        

        left_btns[0].addEventListener("click", () => {
            current_track.currentTime = 0;
        });


        volume_range.addEventListener("change", () => {
            current_track.volume = volume_range.value / 100;
        });

        PlayRange.addEventListener("change", () => {
            current_track.currentTime = (PlayRange.value / 100) * current_track.duration;
        });

        
    }

    PlayPause.addEventListener("click", play_pause);

    function Load_current_musics_Base()
    {
        
        document.getElementsByClassName("song-cover-info-singer")[0].innerHTML =
            `<span><img src="../assets/images/player/person.svg" alt="singer"></span>${current_song.artist}`;

        document.getElementsByClassName("song-cover-info-name")[0].innerHTML =
            `<span><img src="../assets/images/player/music.svg" alt="singer"></span>${current_song.name}`;

        document.querySelector(".song-cover-pic > img").src = `${current_song.cover}`;
        // document.querySelector(".song-interact-like > span").innerHTML = `1000&nbsp;`;
        document.querySelector(".lyrics-container").innerHTML = `${current_song.lyrics}`;
        
    }

    function InfoLyrics_Settings()
    {
        lyrics_container.style.visibility = "hidden";
        infos[1].innerHTML = current_song.artist;
        infos[3].innerHTML = current_song.name;
        infos[5].innerHTML = current_song.publish_date.substr(0,10);
    }

    function load_track() {
        current_track.src = `${current_song.file}`
        current_track.load();
        current_track.volume = volume_range.value /100 ;
        setInterval(SeekUpdate, 1000);
        current_track.addEventListener("ended", NextTrack);
    }

    function play_pause() {
       if(token){
        if (!isPlaying) {
            isPlaying = true;
            PlayPause.querySelector("img").src = "../assets/images/player/music/pause_black.svg"
            current_track.play();
        } else {
            isPlaying = false;
            PlayPause.querySelector("img").src = "../assets/images/player/music/play_arrow.svg"
            current_track.pause();
        }
       }else{
           showAlertPage();
       }
    }

    function NextTrack() {
        recommand_index = (recommand_index === res.length - 1) ? 0 : recommand_index + 1 ;
        window.location.href = 'player.html?song_id=' + encodeURIComponent((res[recommand_index].id).toString());
    }

    function PrevTrack()
    {
        recommand_index = (recommand_index === 0) ? res.length -1 : recommand_index -1 ;
        window.location.href = 'player.html?song_id=' + encodeURIComponent((res[recommand_index].id).toString());
    }

    function SeekUpdate() {
        if (!isNaN(current_track.duration)) {
            PlayRange.value = current_track.currentTime * (100 / current_track.duration);
            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(current_track.currentTime / 60);
            let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(current_track.duration / 60);
            let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);
            if (currentSeconds < 10) {
                currentSeconds = "0" + currentSeconds;
            }
            if (durationSeconds < 10) {
                durationSeconds = "0" + durationSeconds;
            }

            // Display the updated duration
            document.querySelector(".time-passed").innerHTML = currentMinutes + ":" + currentSeconds;
            document.querySelector(".time-remained").innerHTML = durationMinutes + ":" + durationSeconds;
        }
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
            })
            .catch((error) => {
                alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
            });
    }
}

const handleAddToPlaylistBtn = async ()=>{
   if(isLogged()){
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
          if(data.ok) return data.json(); 
          })
          .then(res => {
            playlistsList =res;
            // console.log(res[0].songs[0].rest.cover)
          })
      .catch((error) => {
          console.log(error)
      });

      const template = document.querySelector('main.player-container template[name="component-add-to-playlist"]')
     if(!playlistsContainer.querySelector('li:not(template>li)')){
        playlistsList.map((playlist)=>{
            const clone = template.content.cloneNode(true);
            clone.querySelector("button").addEventListener("click",()=>addToPlaylist(playlist.id,songId))
            clone.querySelector("button").innerText= `${playlist.name}`;
            playlistsContainer.appendChild(clone)
            return(clone)
          })
     }

    //   playlistsContainer.innerHTML = content.join('');

      showAddPage();
   }else {
       showAlertPage();
   }
}

function display_recommends(songs)
{
    const container = document.querySelector(".playlist-box");
    const template = document.querySelector('main.player-container .playlist-box template[name="component-recommends-item"]')
    songs.map(song => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.playlist-box-item-pic img').src = `${song.cover}`;
        clone.querySelector('.playlist-box-item-text h6').innerText = `${song.artist}`;
        clone.querySelector('.playlist-box-item-text h5').innerText = `${song.name}`;
        container.appendChild(clone)
        return (
          clone
        );
    });
   
}


// ---------------- ADD SONG TO PLAYLIST
const addToPlaylistBtn = document.querySelector('main.player-container .add-to-playlist-btn');
const addPage = document.querySelector('main.player-container .add-to-playlist-page');
const addBox = document.querySelector('main.player-container .add-to-playlist-page .add-to-playlist-page-box');
const playlistsContainer = document.querySelector('main.player-container .add-to-playlist-page .add-to-playlist-page-box ul');
const playlistBtn = document.querySelectorAll('main.player-container .add-to-playlist-page .add-to-playlist-page-box ul li button');
const songId = getParams('song_id')
let playlistsList = [];

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

const showAddPage = ()=>{
        addPage.style.display = 'flex';
        setTimeout(() => {
        addBox.style.transform = 'scale(1)'
        }, 1)
}
const hideAddPage = ()=>{
        addPage.addEventListener('click', (e)=>{
        if(e.target.closest('.add-to-playlist-page .add-to-playlist-page-box ul li button')){
            addBox.style.transform='scale(.1)'
            setTimeout(() => {
                addPage.style.display='none';
            }, 350)
            return;
        }
        if(e.target.closest('main.player-container .add-to-playlist-page .add-to-playlist-page-box')) return;
        addBox.style.transform='scale(.1)'
        setTimeout(() => {
            addPage.style.display='none';
        }, 350)
    })
}

 hideAddPage();

  playlistBtn.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        
        hideAddPage();
      })
  })
  