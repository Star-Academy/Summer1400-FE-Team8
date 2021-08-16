import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/interfaces';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-song-item',
  templateUrl: './playlist-song-item.component.html',
  styleUrls: ['./playlist-song-item.component.scss']
})
export class PlaylistSongItemComponent implements OnInit {

  @Input() song !: Song;
  @Input() playlistId !: string;

  constructor(private playlistService: PlaylistService) { }

  removeSongFromPlaylist(e:any,songId:string){
    const container = e.target.parentElement.parentElement;
      this.playlistService.removeFromPlaylist(this.playlistId, songId).subscribe(
        ()=>container.classList.add('display-none')
      )
  }

  ngOnInit(): void {
  }

}
