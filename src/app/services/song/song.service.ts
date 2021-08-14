import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';
import {Song} from '../../interfaces/interfaces'
@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http:HttpClient) { }

  private API = 'https://songs.code-star.ir';

  getAllSongs():Observable<Song[]>{
    return this.http.get<Song[]>(`${this.API}/songs/all`)
  }
  getOneSong(songId:string):Observable<Song>{
    return this.http.get<Song>(`${this.API}/song/one/${songId}`)
  }


}
