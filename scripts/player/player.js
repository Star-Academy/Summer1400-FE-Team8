// document.addEventListener("DOMContentLoaded", () => {
// the songs should be fetched from server and after this we will have them as songs object (create fake information)
// let songs = {
//     "id": {
//         "1": {
//             "singer_name": "حسین رحمتی",
//             "song_name": "دوجا",
//             "liked": "1000",
//             "text": text1
//             ,
//             "img": "assets/images/player/cover2.jpg",
//             "music_src": "https://dl.jzmusic.ir/musics/rap/ho3ein/ho3ein%202ja128.mp3"
//         },
//         "2": {
//             "singer_name": "اوزیر مهدی ",
//             "song_name": "گول بالام",
//             "liked": "2000",
//             "text": text1
//             ,
//             "img": "assets/images/player/uzeyir.jpg",
//             "music_src": "http://dl.ardabilmusic.com/97/Mehdi/Other/Uzeyir%20Mehdizade/Uzeyir_Mehdizade_-_Ay_balam_2016_%28ft_Sevcan_Dalkiran%29_%28Www.ArdabilMusic.Com%29.mp3",
//         },
//         "3": {
//             "singer_name": "ترلان نواخانی",
//             "song_name": "ساغالماز",
//             "liked": "5000",
//             "text": text1
//             ,
//             "img": "assets/images/player/tarlan.jpg",
//             "music_src": "https://dl.joyamusic.ir/Album%20Khareji/Terlan%20Novxani/128/Bimar(joyamusic)(128).mp3"
//         },
//         "4": {
//             "singer_name": "علی پرمهر",
//             "song_name": "سلام یتیر",
//             "liked": "2500",
//             "text": text1
//             ,
//             "img": "assets/images/player/salam.jpg",
//             "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
//         },
//         "5": {
//             "singer_name": "ترلان نواخانی",
//             "song_name": "ساغالماز",
//             "liked": "1000",
//             "text": text1
//             ,
//             "img": "assets/images/player/cover2.jpg",
//             "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
//         },
//         "6": {
//             "singer_name": "علی پرمهر",
//             "song_name": "سلام یتیر",
//             "liked": "2500",
//             "text": text1
//             ,
//             "img": "assets/images/player/salam.jpg",
//             "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
//         }
//     }
// };
let songs = []
let allPlaylists = [];
let user_json = {"admin": ["1", "2"]};


Process().then();

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
    const token = getToken();

    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    let l = params.length;
    for (let i = 0; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    let current_song = await getData(data.song_id);

    // console.log(current_song);

    // res : مرتبط با سلیقت
    const res = songs.filter(song =>
        song.artist === current_song.artist
    );
    console.log(res);

    await getPlaylists();

    console.log(allPlaylists);

    //*****************************************************************************************************************
    Load_current_musics_Base();
    //*****************************************************************************************************************
    display_recommends(res);
    //*****************************************************************************************************************

    let heart_btn = document.querySelector(".song-interact > .song-interact-like > button")
    let song_like = document.querySelector(".song-interact-like > span");
    let favorite_bar = document.querySelector(".song-interact-favorite");
    let btn_favorite = favorite_bar.querySelector("button");
    let info_btn = document.querySelector(".details-buttons-info");
    let lyrics_btn = document.querySelector(".details-buttons-lyrics");
    let info_container = document.querySelector(".info_container");
    let infos = info_container.querySelectorAll("p > span")
    let lyrics_container = document.querySelector(".lyrics-container");
    const items = document.querySelectorAll(".playlist-box-item");
    let Next = document.querySelector("#Next");
    let Prev = document.querySelector("#Prev");
    let current_track = document.createElement("audio");
    let left_btns = document.querySelectorAll(".song-play-bottom-left > button");
    let PlayPause = document.querySelector("#PlayPause");
    let PlayRange = document.querySelector(".play-range > .custom-range-slider");
    let volume_range = document.querySelector(".volume-range-wrapper > .custom-range-slider");
    let alert_container = document.querySelector(".signup-alert-container");
    let play_list = false;
    let isPlaying = false;

    const current_in_recommands  = (element) => element.id === current_song.id;
    let recommand_index = res.findIndex(current_in_recommands);

    let play_list_name = "1";

    const current_play_list = (current) => current.name === play_list_name ;
    let play_list_index = allPlaylists.findIndex(current_play_list);

    let play_list_selected_id = allPlaylists[play_list_index].id;
    console.log(play_list_selected_id);



    if (token)
    {
        load_track(data.song_id);

        InfoLyrics_Settings();

        if (user_json["admin"].includes(data.song_id)) {
            heart_btn.innerHTML = `<img src="assets/images/player/heart_fill.svg" alt="heart">`
        }
        heart_btn.addEventListener("click", () => {
            if (user_json["admin"].includes(data.song_id)) {
                heart_btn.innerHTML = `<img src="assets/images/player/heart_outline.svg" alt="heart">`
                const index = user_json["admin"].indexOf(data.song_id);
                user_json["admin"].splice(index, 1);
                song_like.innerHTML = `${parseInt(songs["id"][data.song_id]["liked"] - 1
                <= 0 ? 0 : songs["id"][data.song_id]["liked"] - 1).toString()
                }&nbsp;`;
                songs["id"][data.song_id]["liked"] -= 1;
            } else {
                heart_btn.innerHTML = `<img src="assets/images/player/heart_fill.svg" alt="heart">`
                user_json["admin"].push(data.song_id);
                document.querySelector(".song-interact-like > span").innerHTML = `${parseInt(songs["id"][data.song_id]["liked"] + 1
                ).toString()}&nbsp;`;
                songs["id"][data.song_id]["liked"] += 1;
            }
        });
        // ****************************************************************************************************************
        // add or remove from play_list

        if (user_json["admin"].includes(data.song_id)) {
            btn_favorite.innerHTML = "حذف از لیست علاقه مندی"
            favorite_bar.querySelector("img").src = "assets/images/player/star_fill.svg";
        }
        btn_favorite.addEventListener("click", () => {
            console.log(user_json);
            if (user_json["admin"].includes(data.song_id)) {
                const index = user_json["admin"].indexOf(data.song_id);
                user_json["admin"].splice(index, 1);
                btn_favorite.innerHTML = "افزودن به لیست علاقه مندی"
                favorite_bar.querySelector("img").src = "assets/images/player/star_outline.svg";
            } else {
                user_json["admin"].push(data.song_id);
                btn_favorite.innerHTML = "حذف از لیست علاقه مندی"
                favorite_bar.querySelector("img").src = "assets/images/player/star_fill.svg";
            }
        });
        // *****************************************************************************************************************


        info_btn.addEventListener("click", () => {
            lyrics_container.style.visibility = "hidden";
            info_container.style.visibility = "visible";
            info_btn.style.backgroundColor = "#33538b";
            lyrics_btn.style.backgroundColor = "#486fb4";

        });
        lyrics_btn.addEventListener("click", () => {
            info_container.style.visibility = "hidden";
            lyrics_container.style.visibility = "visible";
            lyrics_btn.style.backgroundColor = "#33538b";
            info_btn.style.backgroundColor = "#486fb4";
        });
//***********************************************************************************************************


//***********************************************************************************************************

        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function () {
                window.location.href = 'player.html?song_id=' + encodeURIComponent((res[i].id).toString());
            });
        }

        //***********************************************************************************************************
        Next.addEventListener("click", () => {
            NextTrack();
        });

        Prev.addEventListener("click", () => {
            PrevTrack();
        });
        //***********************************************************************************************************

        left_btns[0].addEventListener("click", () => {
            current_track.currentTime = 0;
        });

        left_btns[1].addEventListener("click", () => {
            if (play_list) {
                left_btns[1].title = "افزودن به پلی لیست";
                play_list = false;

            } else {
                addToPlaylist(play_list_selected_id , current_song.id)
                left_btns[1].title = "حذف از پلی لیست";
                play_list = true;
            }
        });

        volume_range.addEventListener("change", () => {
            current_track.volume = volume_range.value / 100;
        });

        PlayRange.addEventListener("change", () => {
            current_track.currentTime = (PlayRange.value / 100) * current_track.duration;
        });

        PlayPause.addEventListener("click", play_pause);
    }
    else
    {
        setInterval(view_alert, 3000);
        function view_alert(){
            if(token) return;
            alert_container.style.display = "flex";
        }
    }

    function Load_current_musics_Base()
    {
        document.getElementsByClassName("song-cover-info-singer")[0].innerHTML =
            `<span><img src="assets/images/player/person.svg" alt="singer"></span>${current_song.artist}`;

        document.getElementsByClassName("song-cover-info-name")[0].innerHTML =
            `<span><img src="assets/images/player/music.svg" alt="singer"></span>${current_song.name}`;

        document.querySelector(".song-cover-pic > img").src = `${current_song.cover}`;
        document.querySelector(".song-interact-like > span").innerHTML = `1000&nbsp;`;
        document.querySelector(".lyrics-container").innerHTML = `${current_song.lyrics}`;
    }

    function InfoLyrics_Settings()
    {
        lyrics_container.style.visibility = "hidden";

        infos[1].innerHTML = current_song.artist;
        infos[3].innerHTML = current_song.name;
        infos[5].innerHTML = current_song.publish_date;
    }

    function load_track() {
        current_track.src = `${current_song.file}`
        current_track.load();
        current_track.volume = volume_range.value /100 ;
        setInterval(SeekUpdate, 1000);
        current_track.addEventListener("ended", NextTrack);
    }

    function play_pause() {
        if (!isPlaying) {
            isPlaying = true;
            PlayPause.querySelector("img").src = "assets/images/player/music/pause_black.svg"
            current_track.play();
        } else {
            isPlaying = false;
            PlayPause.querySelector("img").src = "assets/images/player/music/play_arrow.svg"
            current_track.pause();
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

    async function getPlaylists()
    {
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
                allPlaylists = res;
            })
            .catch((error) => {
                // alert('خطایی رخ داد . لطفا دوباره سعی کنید .')
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
}

// });
function display_recommends(songs)
{
    document.getElementsByClassName("playlist-box")[0].innerHTML = songs.map(song => {
        return (
            `<div class="playlist-box-item">
                  <div class="playlist-box-item-pic">
                    <img src=${song.cover} alt="cover">
                  </div>
                  <div class="playlist-box-item-text">
                    <h6>${song.artist}</h6>
                    <h5>${song.name}</h5>
                  </div>
                  <div class="playlist-box-item-add">
                        <button>
                        </button>
                  </div>
                </div>`
        );
    });
}

