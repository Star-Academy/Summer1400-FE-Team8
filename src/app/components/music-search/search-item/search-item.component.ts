import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/interfaces';
import { Input } from '@angular/core';
@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() song: Song = {
    id: '',
    name: '',
    artist: '',
    lyrics: '',
    cover: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
