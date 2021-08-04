
images = ["assets/images/player/cover2.jpg" , "assets/images/player/uzeyir.jpg" ,
           "assets/images/player/tarlan.jpg" ,"assets/images/player/salam.jpg" , "assets/images/player/cover2.jpg" ,
           "assets/images/player/salam.jpg"]

let recommends = "";
for (let i = 0; i < images.length; i++)
{
    recommends += `<div class="favorites-box-item">
                <div class="favorites-box-item-pic">
                    <img src=${images[i]} alt="cover" />
                </div>
                <div class="favorites-box-item-text">
                    <h6> نام هنرمند</h6>
                    <h5>نام آهنگ</h5>
                </div>
                <div class="favorites-box-item-play">
<!--                    <a href="player.html">-->
                        <button></button>
                    </a>
                </div>
                <div class="favorites-box-item-delete">
                    <img src="assets/images/favorites/delete.svg" alt="delete" />
                </div>
            </div>`
}
document.querySelector('.favorites').innerHTML = recommends;

const items = document.querySelectorAll(".favorites-box-item-play" );

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function () {
        window.location.href = 'player.html?song_id=' + encodeURIComponent((i + 1).toString());
    });
}
const dels = document.querySelectorAll(".favorites-box-item > .favorites-box-item-delete");

for (let i = 0; i < dels.length; i++) {
    dels[i].addEventListener("click", function () {
        //update dataset
        window.location.href = 'favorite.html';
    });
}




