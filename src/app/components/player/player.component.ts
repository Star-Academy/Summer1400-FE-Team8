import {Component, OnInit} from '@angular/core';
import {SongService} from 'src/app/services/song/song.service';
import {Songs} from './Songs';
import {Router} from "@angular/router";
import {Song} from '../../interfaces/interfaces'
import { ViewChild , AfterViewInit } from '@angular/core';
import {CardComponent} from "../card/card.component";
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']

})
export class PlayerComponent implements OnInit , AfterViewInit
{
  @ViewChildren('allItems') boxItems: QueryList<Song> | undefined;

  ngAfterViewInit()
  {
    // @ts-ignore
    this.boxItems.changes.subscribe(() =>
    {
      this.items = document.querySelectorAll(".playlist-box");
      console.log(this.items.length);
      for (let i = 0; i < this.items.length; i++)
      {
        this.items[i].addEventListener("click", () =>
        {
          localStorage.setItem('song-id', (this.recommends[i]).id);
          window.location.reload();
        });
      }
    })
  }

  public songs: Song[] = [];
  public song: any;
  public recommends: any = [];
  public heart_btn: any;
  public song_like: any;
  public favorite_bar: any;
  public btn_favorite: any;
  public info_btn: any;
  public lyrics_btn: any;
  public info_container: any;
  public infos: any;
  public lyrics_container: any;
  public items: any
  public Next: any;
  public Prev: any;
  public current_track: any;
  public TimePassed: any;
  public TimeRemained: any;
  public left_btns: any;
  public PlayPause: any;
  public PlayRange: any;
  public volume_range: any;
  public alert_container: any;
  public isPlaying: boolean | undefined;
  public recommand_index: number | undefined;


  constructor(private songService: SongService, private router: Router) {  }


  async initialization() {
    this.heart_btn = document.querySelector(".song-interact > .song-interact-like > button")
    this.song_like = document.querySelector(".song-interact-like > span");
    this.favorite_bar = document.querySelector(".song-interact-favorite");
    this.btn_favorite = this.favorite_bar.querySelector("button");
    this.info_btn = document.querySelector(".details-buttons-info");
    this.lyrics_btn = document.querySelector(".details-buttons-lyrics");
    this.info_container = document.querySelector(".info_container");
    this.infos = this.info_container.querySelectorAll("p > span")
    this.lyrics_container = document.querySelector(".lyrics-container");
    this.Next = document.querySelector("#Next");
    this.Prev = document.querySelector("#Prev");
    this.current_track = document.createElement("audio");
    this.TimePassed = document.querySelector(".time-passed");
    this.TimeRemained = document.querySelector(".time-remained");
    this.left_btns = document.querySelectorAll(".song-play-bottom-left > button");
    this.PlayPause = document.querySelector("#PlayPause");
    this.PlayRange = document.querySelector(".play-range > .custom-range-slider");
    this.volume_range = document.querySelector(".volume-range-wrapper > .custom-range-slider");
    this.alert_container = document.querySelector(".signup-alert-container");
    this.isPlaying = false;
  }

  Process = async () => {
    this.LoadCurrentMusicInforms();
    this.LoadCurrentSong();

  }
  LoadCurrentMusicInforms = () => {
    document.getElementsByClassName("song-cover-info-singer")[0].innerHTML =
      `<span><img src="assets/images/player/person.svg" alt="singer"></span>${this.song.artist}`;
    document.getElementsByClassName("song-cover-info-name")[0].innerHTML =
      `<span><img src="assets/images/player/music.svg" alt="singer"></span>${this.song.name}`;

    let image = <HTMLImageElement>document.querySelector(".song-cover-pic > img");
    let span = <any>document.querySelector(".song-interact-like > span");
    let lyrics = <any>document.querySelector(".lyrics-container");

    image.src = `${this.song.cover}`;
    span.innerHTML = `2000&nbsp;`;
    lyrics.innerHTML = `${this.song.lyrics}`;
  }

  InfoLyricsSettings = () => {
    this.lyrics_container.style.visibility = "hidden";

    this.infos[1].innerHTML = this.song.artist;
    this.infos[3].innerHTML = this.song.name;
    this.infos[5].innerHTML = this.song.publish_date;
  }

  LoadCurrentSong = () => {
    this.load_track();
    this.InfoLyricsSettings();
    this.info_btn.addEventListener("click", () => {
      this.lyrics_container.style.visibility = "hidden";
      this.info_container.style.visibility = "visible";
      this.info_btn.style.backgroundColor = "#33538b";
      this.lyrics_btn.style.backgroundColor = "#486fb4";

    });
    this.lyrics_btn.addEventListener("click", () => {
      this.info_container.style.visibility = "hidden";
      this.lyrics_container.style.visibility = "visible";
      this.lyrics_btn.style.backgroundColor = "#33538b";
      this.info_btn.style.backgroundColor = "#486fb4";
    });
    this.Next.addEventListener("click", () => {
      this.NextTrack();
    });

    this.Prev.addEventListener("click", () => {
      this.PrevTrack();
    });

    this.left_btns[0].addEventListener("click", () => {
      this.current_track.currentTime = 0;
    });

    // this.left_btns[1].addEventListener("click", () => {
    //   if (play_list) {
    //     left_btns[1].title = "افزودن به پلی لیست";
    //     play_list = false;
    //
    //   } else {
    //     addToPlaylist(play_list_selected_id , current_song.id)
    //     left_btns[1].title = "حذف از پلی لیست";
    //     play_list = true;
    //   }
    // });

    this.volume_range.addEventListener("change", () => {
      this.current_track.volume = this.volume_range.value / 100;
    });

    this.PlayRange.addEventListener("change", () => {
      this.current_track.currentTime = (this.PlayRange.value / 100) * this.current_track.duration;
    });

    this.PlayPause.addEventListener("click", this.play_pause);

  }

  load_track = () => {
    this.current_track.src = `${this.song.file}`
    this.current_track.load();
    this.current_track.volume = this.volume_range.value / 100;
    setInterval(this.SeekUpdate, 1000);
    this.current_track.addEventListener("ended", this.NextTrack);
  }
  play_pause = () => {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.PlayPause.querySelector("img").src = "assets/images/player/music/pause_black.svg"
      this.current_track.play();
    } else {
      this.isPlaying = false;
      this.PlayPause.querySelector("img").src = "assets/images/player/music/play_arrow.svg"
      this.current_track.pause();
    }
  }
  NextTrack = () => {
    // @ts-ignore
    this.recommand_index = (this.recommand_index === this.recommends.length - 1) ? 0 : this.recommand_index + 1;
    localStorage.setItem('song-id', ((this.recommends[this.recommand_index]).id));
    window.location.reload();
  }

  PrevTrack = () => {
    // @ts-ignore
    this.recommand_index = (this.recommand_index === 0) ? this.recommends.length - 1 : this.recommand_index - 1;
    localStorage.setItem('song-id', ((this.recommends[this.recommand_index]).id));
    window.location.reload();
  }

  SeekUpdate = () => {
    if (!isNaN(this.current_track.duration)) {
      this.PlayRange.value = this.current_track.currentTime * (100 / this.current_track.duration);
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(this.current_track.currentTime / 60);
      let currentSeconds = Math.floor(this.current_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(this.current_track.duration / 60);
      let durationSeconds = Math.floor(this.current_track.duration - durationMinutes * 60);
      if (currentSeconds < 10) {
        // @ts-ignore
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        // @ts-ignore
        durationSeconds = "0" + durationSeconds;
      }

      // Display the updated duration
      this.TimePassed.innerHTML = currentMinutes + ":" + currentSeconds;
      this.TimeRemained.innerHTML = durationMinutes + ":" + durationSeconds;
    }
  }

  async displayRecommends()
  {
    document.getElementsByClassName("playlist-box")[0].innerHTML = this.recommends.map((song: { cover: any; artist: any; name: any; }) => {
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

  async ngOnInit(): Promise<void> {
    console.log(localStorage.getItem('song-id'));

    this.songService.getAllSongs().subscribe(
      (res : any) =>
      {
        this.songs = res.songs;
        this.song = this.songs.find(song => song.id == localStorage.getItem('song-id') );
        console.log(this.song);
        this.recommends = this.songs.filter(song => song.artist == this.song.artist);
        console.log(this.recommends);
        const current_in_recommands = (element: { id: any; }) => element.id === this.song.id;
        this.recommand_index = this.recommends.findIndex(current_in_recommands);

        // this.displayRecommends();

        this.initialization();

        this.Process();
      }
    );

  }

  ngOnChanges()
  {
    if(this.items)
    {
      console.log("hala");
    }
  }

}
