import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from 'src/app/interfaces/interfaces';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  constructor(private router: Router, private actRoute : ActivatedRoute , private playlistService: PlaylistService) { }

  @Input() playlist !: Playlist;
  lastElmObj : any ;
  lastElmObjCover !: string;
  noCoverImg :string = "../../../../assets/images/playlists/no-cover.jpg"

  showPlaylistSongs(e:any){
    if(e.target.closest('.playlists-item-delete img')) return;
    this.router.navigateByUrl(`profile/playlist/${this.playlist.id}`)
  }
  
  removePlaylist(e:any){
    const container = e.target.parentElement.parentElement.parentElement.parentElement;
    this.playlistService.deletePlaylist(this.playlist.id).subscribe(
      () => container.classList.add('display-none')
    )
  }
  ngOnInit(): void {
    if(this.playlist.songs.length){
      this.lastElmObj = this.playlist.songs[this.playlist.songs.length-1];
      this.lastElmObjCover = this.lastElmObj.cover;
    }
  }

}
