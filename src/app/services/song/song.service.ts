import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song, SongPage, SongFind } from '../../interfaces/interfaces';
import { Songs } from '../../components/player/Songs';
const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

const API = 'https://songs.code-star.ir';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API}/song/all`);
  }
  getOneSong(songId: string): Observable<Song> {
    return this.http.get<Song>(`${API}/song/one/${songId}`);
  }
  postSongsPage(size: number, current: string, sorter: string, desc: boolean): Observable<Song[]> {
    const songPage: SongPage = {
      size,
      current,
      sorter,
      desc,
    };
    return this.http.post<Song[]>(`${API}/song/page`, songPage, httpOptions);
  }

  postSongsFind(phrase: string, count: number, sorter: string, desc: boolean): Observable<Song[]> {
    const songFind: SongFind = {
      phrase,
      count,
      sorter,
      desc,
    };
    return this.http.post<Song[]>(`${API}/song/find`, songFind, httpOptions);
  }

  public async getSongs(): Promise<Songs[]> {
    return new Promise<Songs[]>((resolve, reject) => {
      // @ts-ignore
      this.http.get(this._API).subscribe((result: Songs[]) => {
        // @ts-ignore
        resolve(result.songs);
      });
    });
  }
}

// //Hamed
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {Songs} from "../../components/player/Songs";
// @Injectable({
//   providedIn: 'root'
// })
// export class SongsService {

//   private _API : string = 'https://songs.code-star.ir/song/all';

//   constructor(private http : HttpClient) { }

//   public async getSongs() : Promise<Songs[]>
//   {
//     return new Promise<Songs[]>((resolve , reject) => {
//       // @ts-ignore
//       this.http.get(this._API).subscribe((result : Songs[]) => {
//        // @ts-ignore
//         resolve(result.songs);
//      });
//   });
//   }
// }
