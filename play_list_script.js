
let recommends = "";
for (let i = 0; i < 14; i++)
{
    recommends += `<div class="playlists-item">
                <div class="playlists-item-pic">
                    <a href="#"
                    ><img src="assets/images/player/cover${i%5 + 2 }.jpg" alt="cover"
                    /></a>
                </div>
                <div class="playlists-item-actions">
                    <div class="playlists-item-text">
                        <h4>
                            <a href="#">پلی لیست <span>${i + 1 }</span></a>
                        </h4>
                    </div>
                    <div class="icons-container">
                        <div class="playlists-item-play">
                            <a href="player.html">
                                <button></button>
                            </a>
                        </div>
                        <div class="playlists-item-delete">
                            <img src="assets/images/favorites/delete.svg" alt="delete" />
                        </div>
                    </div>
                </div>
            </div>`
}
document.querySelector('.playlists').innerHTML = recommends;