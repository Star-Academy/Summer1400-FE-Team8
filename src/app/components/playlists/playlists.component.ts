import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import {Playlist} from '../../interfaces/interfaces'
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  constructor(private playlistService: PlaylistService) { }

  playlists: Playlist[] = [];

  createPlaylist(e:any){
    e.preventDefault();
    const name = e.target[0].value
    if(name){
        const createPage = document.querySelector('main.playlists-container .create-playlist-page') as HTMLDivElement;
        const createBox = document.querySelector('main.playlists-container .create-playlist-page-box ') as HTMLDivElement;
        this.playlistService.createPlaylist(name).subscribe(()=>this.getAllPlaylists());
        createBox.style.transform='scale(.1)'
        setTimeout(() => {
          createPage.style.display='none';
        }, 350)
        e.target[0].value= '';
        
    }else{
      alert('لطفا یه نام برای پلی لیست جدید انتخاب کن')
    }
    
  }

  getAllPlaylists(){
    this.playlistService.getPlaylists().subscribe(
      res=>{
        this.playlists = res;
        console.log(res)
      },
      err => err
    )
  }

  ngOnInit(): void {
    this.getAllPlaylists();

    const createBtn = document.querySelector('main.playlists-container .create-playlist-btn') as HTMLButtonElement;
    const createPage = document.querySelector('main.playlists-container .create-playlist-page') as HTMLDivElement;
    const createBox = document.querySelector('main.playlists-container .create-playlist-page-box ') as HTMLDivElement;
    const createInput = document.querySelector('main.playlists-container .create-playlist-input input[type="text"]') as HTMLInputElement;

    createBtn.addEventListener('click', ()=>{
      createPage.style.display = 'flex';
      createInput.focus();
      setTimeout(() => {
        createBox.style.transform = 'scale(1)'
      }, 1)
    })

    createPage.addEventListener('click', (e:any)=>{
      if(e.target.closest('main.playlists-container .create-playlist-page-box')) return;
      createBox.style.transform='scale(.1)'
      setTimeout(() => {
        createPage.style.display='none';
      }, 350)
    })
  }
}
