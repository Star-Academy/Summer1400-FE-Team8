import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {SongService} from 'src/app/services/song/song.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Song} from '../../interfaces/interfaces'
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']

})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('lyricsContainer') lyricsContainer!: ElementRef;
  @ViewChild('infoContainer') infoContainer!: ElementRef;
  @ViewChild('detailsInfo') detailsInfoButton!: ElementRef;
  @ViewChild('detailsLyrics') detailsLyricsButton!: ElementRef;
  @ViewChild('timePassed') timePassed!: ElementRef;
  @ViewChild('timeRemained') timeRemained!: ElementRef;
  @ViewChild('playpauseImage') playpauseImage!: ElementRef;
  @ViewChild('playRange') playRange!: ElementRef;
  @ViewChild('volumeRange') volumeRange!: ElementRef;
  @ViewChild('registerAlert', {static: false}) registerAlert!: ElementRef;

  @ViewChildren('allItems') boxItems!: QueryList<ElementRef>;
  public songs: Song[] = [];
  public song: Song | any;
  public recommends: Song[] = [];
  public current_track: any;
  public alert_container: any;
  public isPlaying!: boolean;
  public recommand_index!: number;
  public songId: string | null | undefined;

  constructor(private renderer2: Renderer2, private songService: SongService, private router: Router, private route: ActivatedRoute, private auth: AuthService) {
  }

  ngAfterViewInit() {
    this.lyricsContainer.nativeElement.style.visibility = "hidden";
    console.log(this.infoContainer.nativeElement);
    this.detailsInfoButton.nativeElement.onclick = (() => {
      this.lyricsContainer.nativeElement.style.visibility = "hidden";
      this.infoContainer.nativeElement.style.visibility = "visible";
      this.detailsInfoButton.nativeElement.style.backgroundColor = "#33538b";
      this.detailsLyricsButton.nativeElement.style.backgroundColor = "#486fb4";
    });
    this.detailsLyricsButton.nativeElement.onclick = (() => {
      this.infoContainer.nativeElement.style.visibility = "hidden";
      this.lyricsContainer.nativeElement.style.visibility = "visible";
      this.detailsLyricsButton.nativeElement.style.backgroundColor = "#33538b";
      this.detailsInfoButton.nativeElement.style.backgroundColor = "#486fb4";
    });
  }

  async initialization() {
    this.current_track = document.createElement("audio");

    this.alert_container = document.querySelector(".signup-alert-container");
    this.isPlaying = false;
  }

  replaySong() {
    this.current_track.currentTime = 0;
  }

  Process = async () => {
    await this.ngAfterViewInit();
    if (this.auth.isLogged())
      this.LoadCurrentSong();
    else {
      this.renderer2.setStyle(this.registerAlert.nativeElement, 'display', 'flex');
    }
  }

  LoadCurrentSong = () => {
    this.load_track();


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

  }

  updatePlaying() {
    this.current_track.currentTime = (this.playRange.nativeElement.value / 100) * this.current_track.duration;
  }

  updateVolume() {
    this.current_track.volume = this.volumeRange.nativeElement.value / 100;
  }

  load_track = async () => {
    this.current_track.src = `${this.song.file}`
    this.current_track.load();
    this.current_track.volume = this.volumeRange.nativeElement.value / 100;
    setInterval(this.SeekUpdate, 1000);
    this.current_track.addEventListener("ended", this.NextTrack);
  }
  play_pause = () => {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.playpauseImage.nativeElement.src = "assets/images/player/music/pause_black.svg"
      this.current_track.play();
    } else {
      this.isPlaying = false;
      this.playpauseImage.nativeElement.src = "assets/images/player/music/play_arrow.svg"
      this.current_track.pause();
    }

  }
  NextTrack = () => {
    this.recommand_index = (this.recommand_index === this.recommends.length - 1) ? 0 : this.recommand_index + 1;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/player', this.recommends[this.recommand_index!].id]));

  }

  PrevTrack = () => {

    this.recommand_index = (this.recommand_index === 0) ? this.recommends.length - 1 : this.recommand_index - 1;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/player', this.recommends[this.recommand_index!].id]));
  }

  SeekUpdate = () => {
    if (this.current_track) {
      if (!isNaN(this.current_track.duration)) {
        this.playRange.nativeElement.value = this.current_track.currentTime * (100 / this.current_track.duration);
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
        this.timePassed.nativeElement.innerHTML = currentMinutes + ":" + currentSeconds;
        this.timeRemained.nativeElement.innerHTML = durationMinutes + ":" + durationSeconds;
      }
    }
  }

  async ngOnInit(): Promise<void> {

    this.songId = this.route.snapshot.paramMap.get('song_id');

    console.log(this.songId);
    console.log(localStorage.getItem('song-id'));

    this.songService.getAllSongs().subscribe(
      (res: any) => {
        this.songs = res.songs;
        this.song = this.songs.find(song => song.id == this.songId);
        console.log(this.song);
        this.recommends = this.songs.filter(song => song.artist == this.song.artist);
        console.log(this.recommends[0].artist);
        const current_in_recommands = (element: { id: any; }) => element.id === this.song.id;
        this.recommand_index = this.recommends.findIndex(current_in_recommands);

        // this.displayRecommends();

        this.initialization();

        this.Process();
      }
    );
  }

  navLogin(toLogin: boolean) {
    if (toLogin) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/user', 'login']));
    } else {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/user', 'signup']));
    }

  }

  navigateRecommends(event: MouseEvent, item: Song) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/player', item.id]));

  }

  ngOnDestroy() {
    if (this.current_track) {
      this.current_track.pause();
      this.current_track = null;
    }
  }


}
