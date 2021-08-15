import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/interfaces';
import {SongService} from 'src/app/services/song/song.service';
import { Input , Output} from '@angular/core';
@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
  @Input() desc : boolean = false;
  @Input() songsInPage : number = 0;
  @Input() page: string = '';
  @Input() sortBy : string = '';
  @Input() song : Song = {
    id: '',
    name: '',
    artist: '',
    lyrics: '',
    cover: ''
  }

  constructor(private songService: SongService) { }

  @Output() songs : Song[] = [];

  ngOnInit(): void {
    this.songService.postSongsPage(this.songsInPage, this.page, this.sortBy, this.desc)
    .subscribe((res:any)=>{
      const songs : Song[] = res.songs;
      this.songs = songs;
    })
  }

}
