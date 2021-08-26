import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from 'src/app/interfaces/interfaces';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  constructor(private actRoute: ActivatedRoute, private playlistService: PlaylistService) {}
  id: string = '';
  playlistName: string = '';
  @Output() songs: Song[] = [];
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id') as string;
    this.playlistService.getOnePlaylist(this.id).subscribe((res) => {
      this.songs = res.songs;
      this.playlistName = res.name;
    });
  }
}
