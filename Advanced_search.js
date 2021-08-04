let text1 = "dfkjd"

let songs  = [{
    "id" : "1" ,
    "singer_name": "حسین رحمتی",
    "song_name": "دوجا",
    "liked": "1000",
    "text": text1 , "type" : "hiphop"
    , "played" : 1
    ,
    "img": "assets/images/player/cover2.jpg",
    "music_src": "https://dl.jzmusic.ir/musics/rap/ho3ein/ho3ein%202ja128.mp3"
}, {
    "id" : "2" ,
    "singer_name": "اوزیر مهدی ",
    "song_name": "گول بالام",
    "liked": "20000",
    "text": text1, "type" : "pop"
    , "played" : 10

    ,
    "img": "assets/images/player/uzeyir.jpg",
    "music_src": "http://dl.ardabilmusic.com/97/Mehdi/Other/Uzeyir%20Mehdizade/Uzeyir_Mehdizade_-_Ay_balam_2016_%28ft_Sevcan_Dalkiran%29_%28Www.ArdabilMusic.Com%29.mp3",
}, {
    "id" : "3" ,
    "singer_name": "ترلان نواخانی",
    "song_name": "ساغالماز",
    "liked": "5000",
    "text": text1 , "type" : "turk"
    , "played" : 20

    ,
    "img": "assets/images/player/tarlan.jpg",
    "music_src": "https://dl.joyamusic.ir/Album%20Khareji/Terlan%20Novxani/128/Bimar(joyamusic)(128).mp3"
 } , {
    "id" : "4" ,
    "singer_name": "علی پرمهر",
    "song_name": "سلام یتیر",
    "liked": "2500",
    "text": text1 , "type" : "pop"
    , "played" : 30

    ,
    "img": "assets/images/player/salam.jpg",
    "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
} , {
    "id" : "5" ,
    "singer_name": "ترلان نواخانی",
    "song_name": "ساغالماز",
    "liked": "1000",
    "text": text1 , "type" : "turk"
    , "played" : 2

    ,
    "img": "assets/images/player/cover2.jpg",
    "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
} , {
    "id" : "6" ,
    "singer_name": "علی پرمهر",
    "song_name": "سلام یتیر",
    "liked": "2500",
    "text": text1 , "type" : "pop"
    , "played" : 400
    ,
    "img": "assets/images/player/salam.jpg",
    "music_src": "http://dl.ardabilmusic.com/94/11/Ali%20Pormehr%20-%20Salam%20Yetir%20(128).mp3"
}];

console.log(songs[0].img)
order_list = [1 , 2 , 3 , 4 , 5 , 6 ];
var selectedFilters = ["all"];
let known_types = ["pop" , "hiphop"];
document.querySelector(".search-results-box").innerHTML = Show_HTML();

const filters = document.querySelectorAll('input[type="checkbox"]');
const items = document.querySelectorAll(".search-results-box-item-play" );
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
        window.location.href = 'player.html?song_id=' + encodeURIComponent((order_list[i]).toString());
    });
}
for (let i = 0; i < filters.length; i++)
{
    filters[i].addEventListener("click", function ()
    {
        order_list = [] ;
       console.log(this.name);
        const index = selectedFilters.indexOf(this.name);
        if (index > -1 )
        {
            selectedFilters.splice(index, 1);
        }
        else
        {
            selectedFilters.push(this.name);
        }

        // console.log(selectedFilters)
        document.querySelector(".search-results-box").innerHTML = Show_HTML();

        const items = document.querySelectorAll(".search-results-box-item-play" );
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function () {
                window.location.href = 'player.html?song_id=' + encodeURIComponent((songs[order_list[i] - 1 ].id ).toString());
            });
        }
    });
}
const sort_filters = document.querySelectorAll('input[type="radio"]');
 for (let i = 0; i < sort_filters.length; i++)
{
    sort_filters[i].addEventListener("click", function ()
    {
        console.log(this.id);
        if (this.id === "newest")
        {
            songs = songs.sort(function(a, b)
            {
                return b.played - a.played ;
            });
        }
        else if (this.id === "most_played")
        {
            songs = songs.sort(function(a, b)
            {
                return b.played - a.played ;
            });
        }
        else if (this.id === "popular")
        {
            songs = songs.sort(function(a, b)
            {
                return b.liked - a.liked ;
            });
        }
        order_list = [];
        for (let j = 0 ; j < songs.length ; j++)
        {
            order_list.push(songs[j].id);
        }
        console.log(order_list);

        document.querySelector(".search-results-box").innerHTML = Show_HTML();

        const items = document.querySelectorAll(".search-results-box-item-play" );
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function () {
                window.location.href = 'player.html?song_id=' + encodeURIComponent((order_list[i]).toString());
            });
        }
    });
}
function Show_HTML()
{
    let recommends = "";

    for (let i = 0; i < songs.length; i++)
    {
        let song_type = songs[i].type;
        if (selectedFilters.indexOf(song_type) > -1 ||  selectedFilters.indexOf("all") > -1 )
        {
            order_list.push(i+1);
           recommends+= `<div class="search-results-box-item">
                        <div class="search-results-box-item-pic">
                            <img src=${songs[i].img} alt="cover" />
                        </div>
                        <div class="search-results-box-item-text">
                            <h5>${songs[i].singer_name}</h5>
                            <h4>${songs[i].song_name}</h4>
                        </div>
                        <div class="search-results-box-item-play">
                            <button></button>
                        </div>
                    </div>`
        }
        else if (selectedFilters.indexOf("others") > -1 && known_types.indexOf(song_type) === -1)
        {
            order_list.push(i+1);
            recommends+= `<div class="search-results-box-item">
                        <div class="search-results-box-item-pic">
                            <img src=${songs[i].img} alt="cover" />
                        </div>
                        <div class="search-results-box-item-text">
                            <h5>${songs[i].singer_name}</h5>
                            <h4>${songs[i].song_name}</h4>
                        </div>
                        <div class="search-results-box-item-play">
                            <button></button>
                        </div>
                    </div>`
        }
    }
    return recommends;
}