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
  @Input() song : Song = {
    id: '',
    name: '',
    artist: '',
    lyrics: '',
    cover: ''
  }

  constructor() { }


  ngOnInit(): void {
  }

}
