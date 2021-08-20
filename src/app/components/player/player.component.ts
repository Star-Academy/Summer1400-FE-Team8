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
import {Playlist, Song} from '../../interfaces/interfaces'
import {AuthService} from 'src/app/services/auth/auth.service';
import {PlaylistService} from 'src/app/services/playlist/playlist.service';
import {CardComponent} from "../card/card.component";

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
  @ViewChild('addPage') addPage!: ElementRef;
  @ViewChild('addBox') addBox!: ElementRef;
  @ViewChildren('playItem') playItems!: QueryList<ElementRef>
  @ViewChildren('allItems') boxItems!: QueryList<ElementRef>;
  @ViewChild('child') child!: CardComponent;

  public songs: Song[] = [];
  public song: Song | any;
  public ss: Song | any;
  public recommends: Song[] = [];
  public playLists: Playlist[] = [];
  public current_track: any;
  public isPlaying!: boolean;
  public recommand_index!: number;
  public songId!: string | null;

  constructor(private renderer2: Renderer2, private songService: SongService, private router: Router, private route: ActivatedRoute,
              private auth: AuthService, private playlistService: PlaylistService) {
  }

  async ngOnInit(): Promise<void> {
    this.songId = this.route.snapshot.paramMap.get('song_id');
    this.playlistService.getPlaylists().subscribe(
      (res: any) => {
        // console.log(res);
        this.playLists = res;
      }
    );
    this.songService.getAllSongs().subscribe(
      (res: any) => {
        // console.log(res);
        this.songs = res.songs;
        this.song = this.songs.find(song => song.id == this.songId);
        this.ss = this.songs.find(song => song.id == this.songId);
        // console.log(this.song);
        this.recommends = this.songs.filter(song => song.artist == this.song.artist);
        // console.log(this.recommends[0].artist);
        const current_in_recommands = (element: { id: any; }) => element.id === this.song.id;
        this.recommand_index = this.recommends.findIndex(current_in_recommands);

        this.initialization();

        this.Process();
      }
    );
  }

  async editPlayLists() {
    await this.playItems.toArray().forEach((e, i) => {
      if (this.playLists[i].songs.some(s => s.id == this.ss.id)) {
        e.nativeElement.classList.add('btn--red');
        e.nativeElement.title = 'حذف از پلی لیست';
      } else {
        // console.log(e.nativeElement);
        e.nativeElement.title = 'افزودن به پلی لیست';
        e.nativeElement.classList.add('btn--blue');
      }
    });
  }

  ngAfterViewInit() {
    this.child.buttonElement.changes.subscribe(() => {
      this.child.buttonElement.forEach((el, i) => {
        el.nativeElement.onclick = (e: { target: { closest: (arg0: string) => any; }; }) => {
          if (e.target.closest('.playlist-box-item-add'))
            this.updateSS(this.recommends[i].id).then(() => this.editPlayLists()).then(() => this.showAddPage());
          else
            this.navigateRecommends(this.recommends[i].id);
        }
      });
    });
    this.editPlayLists();
    this.hideAddPage();

    this.detailsInfoButton.nativeElement.onclick = (() => {
      this.infoContainer.nativeElement.style.display = "initial";
      this.lyricsContainer.nativeElement.style.display = "none";
      this.detailsInfoButton.nativeElement.style.backgroundColor = "#33538b";
      this.detailsLyricsButton.nativeElement.style.backgroundColor = "#486fb4";
    });
    this.detailsLyricsButton.nativeElement.onclick = (() => {
      this.lyricsContainer.nativeElement.style.display = "initial";
      this.infoContainer.nativeElement.style.display = "none";
      this.detailsLyricsButton.nativeElement.style.backgroundColor = "#33538b";
      this.detailsInfoButton.nativeElement.style.backgroundColor = "#486fb4";
    });
  }

  hideAddPage() {
    this.addPage.nativeElement.onclick = (e: { target: { closest: (arg0: string) => any; }; }) => {
      if (e.target.closest('.add-to-playlist-page .add-to-playlist-page-box ul li button')) {
        this.addBox.nativeElement.style.transform = 'scale(.1)'
        setTimeout(() => {
          this.addPage.nativeElement.style.display = 'none';
        }, 350)
        return;
      }
      if (e.target.closest('main.player-container .add-to-playlist-page .add-to-playlist-page-box')) return;
      this.addBox.nativeElement.style.transform = 'scale(.1)'
      setTimeout(() => {
        this.addPage.nativeElement.style.display = 'none';
      }, 350)
    }
  }

  separatePlayList() {
    this.updateSS(this.song.id).then(() => this.editPlayLists()).then(() => this.showAddPage());
  }

  async updateSS(sid: string) {
    await (this.ss = this.songs.find(song => song.id == sid));
  }

  async showAddPage() {
    await this.ngAfterViewInit();
    this.addPage.nativeElement.style.display = 'flex';
    setTimeout(() => {
      this.addBox.nativeElement.style.transform = 'scale(1)'
    }, 1)
  }

  initialization() {
    this.current_track = document.createElement("audio");
    this.isPlaying = false;
  }

  Process = async () => {
    await this.ngAfterViewInit();
    if (this.auth.isLogged())
      this.loadSong();
    else {
      this.renderer2.setStyle(this.registerAlert.nativeElement, 'display', 'flex');
    }
  }

  loadSong = () => {

    this.loadTrack();

  }

  loadTrack = () => {
    this.current_track.src = `${this.song.file}`
    this.current_track.load();
    this.current_track.volume = this.volumeRange.nativeElement.value / 100;
    setInterval(this.seekUpdate, 1000);
    this.current_track.addEventListener("ended", this.nextTrack);
  }
  playStop = () => {
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
  nextTrack = () => {
    this.recommand_index = (this.recommand_index === this.recommends.length - 1) ? 0 : this.recommand_index + 1;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/player', this.recommends[this.recommand_index!].id]));

  }

  prevTrack = () => {

    this.recommand_index = (this.recommand_index === 0) ? this.recommends.length - 1 : this.recommand_index - 1;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/player', this.recommends[this.recommand_index!].id]));
  }
  seekUpdate = async () => {
    if (this.current_track) {
      if (!isNaN(this.current_track.duration)) {
        await (this.playRange.nativeElement.value = this.current_track.currentTime * (100 / this.current_track.duration));
        this.updateRange(this.playRange.nativeElement.value);
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

  replaySong() {
    this.current_track.currentTime = 0;
  }

  updatePlaying(value: string) {
    this.current_track.currentTime = (this.playRange.nativeElement.value / 100) * this.current_track.duration;
    this.playRange.nativeElement.style.background = "linear-gradient(to right, #33538AFF " + value + "%, #fff 0%)";
  }

  updateRange(value: string) {
    this.playRange.nativeElement.style.background = "linear-gradient(to right, #33538AFF " + value + "%, #fff 0%)";
  }

  updateVolume(volume: string) {
    this.volumeRange.nativeElement.style.background = "linear-gradient(to right, #33538AFF " + volume + "%, #fff 0%)";

    this.current_track.volume = parseInt(volume) / 100;
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

  navigateRecommends(item: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/player', item]));

  }

  updateplayList(item: Playlist) {
    if (!item.songs.some(e => e.id == this.ss.id)) {
      this.playlistService.addToPlaylist(item.id.toString(), this.ss.id).subscribe(() => this.playlistService
        .getPlaylists().subscribe(res => {
          this.playLists = res;
          this.editPlayLists();
        }));
      alert("آهنگ " + this.ss.name + " به پلی لیست  " + item.name + " اضافه شد");
    } else {
      this.playlistService.removeFromPlaylist(item.id.toString(), this.ss.id).subscribe(() => this.playlistService
        .getPlaylists().subscribe(res => {
          this.playLists = res;
          this.editPlayLists();
        }));
      alert("آهنگ " + this.ss.name + " از پلی لیست  " + item.name + " حذف شد");
    }
  }

  ngOnDestroy() {
    if (this.current_track) {
      this.current_track.pause();
      this.current_track = null;
    }
  }
}
