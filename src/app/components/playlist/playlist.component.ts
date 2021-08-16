import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Song } from 'src/app/interfaces/interfaces';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  constructor(private router: Router, private actRoute : ActivatedRoute, private playlistService: PlaylistService) { }

  id:string ='';
  playlistName:string ='';
  @Output() songs : Song[] = [];

  ngOnInit(): void {
    this.id = (this.actRoute.snapshot.paramMap.get('id') as string)
    // this.playlistService.addToPlaylist(this.id, '111').subscribe((res)=>console.log(res))
    // this.playlistService.addToPlaylist(this.id, '122').subscribe((res)=>console.log(res))
    // this.playlistService.addToPlaylist(this.id, '523').subscribe((res)=>console.log(res))
    // this.playlistService.addToPlaylist(this.id, '714').subscribe((res)=>console.log(res))
   
    this.playlistService.getOnePlaylist(this.id)
    .subscribe(res=>{
      this.songs = res.songs;
      console.log(res)
      this.playlistName = res.name;
    })
  }

}
