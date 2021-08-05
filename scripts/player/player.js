document.addEventListener("DOMContentLoaded", () => {

    let text1 = "این یک متن پیش فرض است: " +
        "بیا بچین جلوم مهرتو" +
        " وقت نگیر فقط داری همین فرصتو" +
        " کفتار ها دیدن همه قدرتو" +
        " تو که جوجی میزنم میپیچم نسختو" +
        " من از کف کوچه های خاکی";
    // the songs should be fetched from server and after this we will have them as songs object (create fake information)
    let songs = {
        "id": {
            "1": {
                "singer_name": "حسین رحمتی",
                "song_name": "دوجا",
                "liked": "1000",
                "text": text1
                ,
                "img": "assets/images/player/cover2.jpg",
                "music_src": "https://dl.jzmusic.ir/musics/rap/ho3ein/ho3ein%202ja128.mp3"
            },
            "2": {
                "singer_name": "اوزیر مهدی ",
                "song_name": "گول بالام",
                "liked": "2000",
                "text": text1
                ,
                "img": "assets/images/player/uzeyir.jpg",
                "music_src": "http://dl.ardabilmusic.com/97/Mehdi/Other/Uzeyir%20Mehdizade/Uzeyir_Mehdizade_-_Ay_balam_2016_%28ft_Sevcan_Dalkiran%29_%28Www.ArdabilMusic.Com%29.mp3",
            },
            "3": {
                "singer_name": "ترلان نواخانی",
                "song_name": "ساغالماز",
                "liked": "5000",
                "text": text1
                ,
                "img": "assets/images/player/tarlan.jpg",
                "music_src": "https://dl.joyamusic.ir/Album%20Khareji/Terlan%20Novxani/128/Bimar(joyamusic)(128).mp3"
            },
            "4": {
                "singer_name": "علی پرمهر",
                "song_name": "سلام یتیر",
                "liked": "2500",
                "text": text1
                ,
                "img": "assets/images/player/salam.jpg",
                "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
            },
            "5": {
                "singer_name": "ترلان نواخانی",
                "song_name": "ساغالماز",
                "liked": "1000",
                "text": text1
                ,
                "img": "assets/images/player/cover2.jpg",
                "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
            },
            "6": {
                "singer_name": "علی پرمهر",
                "song_name": "سلام یتیر",
                "liked": "2500",
                "text": text1
                ,
                "img": "assets/images/player/salam.jpg",
                "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
            }
        }
    };
    // *****************************************************************************************************************
    user_json = {"admin": ["1", "2"]};
    // *****************************************************************************************************************
    // const musics = '{"result":true, "count":42}';
    // const data = JSON.parse(musics);
    // console.log(data);
    //   let ddt = getdata("data.json").then(ddt=> console.log(ddt));
    // after fetching , we have to justify contents according to  their relevant values
    // *****************************************************************************************************************
    // get the song id passed by user to see details
    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    let l = params.length;
    for (let i = 0; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    // document.getElementsByClassName('lyrics-container')[0].innerHTML = data.song_id; ;
    // *****************************************************************************************************************
    // select some elements to processing them later
    document.getElementsByClassName("song-cover-info-singer")[0].innerHTML =
        `<span><img src="assets/images/player/person.svg" alt="singer"></span>${songs["id"][data.song_id]["singer_name"]}`;

    document.getElementsByClassName("song-cover-info-name")[0].innerHTML =
        `<span><img src="assets/images/player/music.svg" alt="singer"></span>${songs["id"][data.song_id]["song_name"]}`;

    document.querySelector(".song-cover-pic > img").src = `${songs["id"][data.song_id]["img"]}`;
    document.querySelector(".song-interact-like > span").innerHTML = `${songs["id"][data.song_id]["liked"]}&nbsp;`;
    document.querySelector(".lyrics-container").innerHTML = `${songs["id"][data.song_id]["text"]}`;
    // *****************************************************************************************************************
    // like or unlike current music
    let heart_btn = document.querySelector(".song-interact > .song-interact-like > button")
    let song_like = document.querySelector(".song-interact-like > span");
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
    let favorite_bar = document.querySelector(".song-interact-favorite");
    let btn_favorite = favorite_bar.querySelector("button");
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

    let info_btn = document.querySelector(".details-buttons-info");
    let lyrics_btn = document.querySelector(".details-buttons-lyrics");
    let info_container = document.querySelector(".infs");
    let lyrics_container = document.querySelector(".lyrics-container");


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

    document.getElementsByClassName("playlist-box")[0].innerHTML = display_recommends(songs);

//***********************************************************************************************************

    const items = document.querySelectorAll(".playlist-box-item");

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function () {
            window.location.href = 'player.html?song_id=' + encodeURIComponent((i + 1).toString());
        });
    }
    //***********************************************************************************************************
    let Next = document.querySelector("#Next");
    Next.addEventListener("click", () => {
        NextTrack();
    });

    let Prev = document.querySelector("#Prev");
    Prev.addEventListener("click", () => {
        PrevTrack();
    });
    //***********************************************************************************************************
    let current_track = document.createElement("audio");

    let left_btns = document.querySelectorAll(".song-play-bottom-left > button");
    left_btns[0].addEventListener("click", () => {
        current_track.currentTime = 0;
    });
    let play_list = false;
    left_btns[1].addEventListener("click", () => {
        if (play_list) {
            left_btns[1].title = "افزودن به پلی لیست";
            play_list = false;
        } else {
            left_btns[1].title = "حذف از پلی لیست";
            play_list = true;
        }
    });
    let PlayPause = document.querySelector("#PlayPause");
    let PlayRange = document.querySelector(".play-range > .custom-range-slider");
    let volume_range = document.querySelector(".volume-range-wrapper > .custom-range-slider");
    volume_range.addEventListener("change", () => {
        current_track.volume = volume_range.value / 100;
    });
    let isPlaying = false;

    PlayRange.addEventListener("change", () => {
        current_track.currentTime = (PlayRange.value / 100) * current_track.duration;
    });
    load_track(data.song_id);

    PlayPause.addEventListener("click", play_pause);

    function load_track() {
        current_track.src = `${songs["id"][data.song_id]["music_src"]}`
        current_track.load();
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
        let next_song = ((parseInt(data.song_id) + 1) % Object.keys(songs.id).length);
        if (next_song === 0)
            next_song = Object.keys(songs.id).length;
        window.location.href = 'player.html?song_id=' + encodeURIComponent(next_song.toString());
    }

    function PrevTrack() {
        let prev_song = ((parseInt(data.song_id) - 1) % Object.keys(songs.id).length);
        if (prev_song <= 0)
            prev_song = Object.keys(songs.id).length;
        window.location.href = 'player.html?song_id=' + encodeURIComponent(prev_song.toString());
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

});

async function getdata(file) {
    try {
        let x = await fetch(file);
        return await x.json();
    } catch (error) {
        console.log(error);
    }
}

function display_recommends(songs) {
    let recommends = "";

    for (let i = 0; i < Object.keys(songs.id).length; i++) {
        recommends += `<div class="playlist-box-item">
                  <div class="playlist-box-item-pic">
                    <img src=${songs["id"][i + 1]["img"]} alt="cover">
                  </div>
                  <div class="playlist-box-item-text">
                    <h6>${songs["id"][i + 1]["singer_name"]}</h6>
                    <h5>${songs["id"][i + 1]["song_name"]}</h5>
                  </div>
                  <div class="playlist-box-item-add">
                        <button>
                        </button>
                  </div>
                </div>`
    }
    return recommends;
}

