import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { Playlist } from '../../interfaces/interfaces';
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  constructor(private playlistService: PlaylistService) {}
  @ViewChild('createPlaylistPageRef') createPlaylistPageRef!: ElementRef;
  @ViewChild('createPlaylistBoxRef') createPlaylistBoxRef!: ElementRef;
  @ViewChild('createPlaylistBtnRef') createPlaylistBtnRef!: ElementRef;
  @ViewChild('createPlaylistInputRef') createPlaylistInputRef!: ElementRef;
  playlists: Playlist[] = [];
  createPage!: any;
  createBox!: any;
  createInput!: any;
  createPlaylist(e: any): boolean {
    e.preventDefault();
    const name = e.target[0].value;
    if (name) {
      this.playlistService.createPlaylist(name).subscribe(() => this.getAllPlaylists());
      this.createBox.style.transform = 'scale(.1)';
      setTimeout(() => {
        this.createPage.style.display = 'none';
      }, 350);
      e.target[0].value = '';
      return true;
    } else {
      alert('لطفا یه نام برای پلی لیست جدید انتخاب کن');
      return false;
    }
  }
  getAllPlaylists() {
    this.playlistService.getPlaylists().subscribe(
      (res) => {
        this.playlists = res;
      },
      (err) => err
    );
  }
  handleCreateBtn() {
    this.createPage.style.display = 'flex';
    this.createInput.focus();
    setTimeout(() => {
      this.createBox.style.transform = 'scale(1)';
    }, 1);
  }
  handleCreatePage(e: any) {
    if (e.target.closest('main.playlists-container .create-playlist-page-box')) return;
    this.createBox.style.transform = 'scale(.1)';
    setTimeout(() => {
      this.createPage.style.display = 'none';
    }, 350);
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.getAllPlaylists();
    this.createPage = this.createPlaylistPageRef.nativeElement;
    this.createBox = this.createPlaylistBoxRef.nativeElement;
    this.createInput = this.createPlaylistInputRef.nativeElement;
  }
}
