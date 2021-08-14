// Amir
// import { Injectable } from '@angular/core';
// import {HttpClient,HttpHeaders} from '@angular/common/http'
// import {Observable} from 'rxjs';
// import {Song} from '../../interfaces/interfaces'
// @Injectable({
//   providedIn: 'root'
// })
// export class SongService {

//   constructor(private http:HttpClient) { }

//   private API = 'https://songs.code-star.ir';

//   getAllSongs():Observable<Song[]>{
//     return this.http.get<Song[]>(`${this.API}/songs/all`)
//   }
//   getOneSong(songId:string):Observable<Song>{
//     return this.http.get<Song>(`${this.API}/song/one/${songId}`)
//   }
// }

//Hamed
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Songs} from "../../components/player/Songs";
@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private _API : string = 'https://songs.code-star.ir/song/all';

  constructor(private http : HttpClient) { }

  public async getSongs() : Promise<Songs[]>
  {
    return new Promise<Songs[]>((resolve , reject) => {
      // @ts-ignore
      this.http.get(this._API).subscribe((result : Songs[]) => {
       // @ts-ignore
        resolve(result.songs);
     });
  });
  }
}

