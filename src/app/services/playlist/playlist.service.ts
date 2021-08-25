import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { Playlist, Song } from '../../interfaces/interfaces';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  cache: 'no-store',
};

const API = 'https://songs.code-star.ir/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private token = this.authService.getToken();

  getPlaylists(): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(`${API}/all`, { token: this.token }, httpOptions);
  }

  createPlaylist(name: string): Observable<Playlist> {
    const data = {
      token: this.token,
      name,
    };
    return this.http.post<Playlist>(`${API}/create`, data, httpOptions);
  }

  deletePlaylist(id: string): Observable<Playlist> {
    const data = {
      token: this.token,
      id,
    };
    return this.http.post<Playlist>(`${API}/remove`, data, httpOptions);
  }

  getOnePlaylist(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${API}/one/${id}`);
  }

  addToPlaylist(playlistId: string, songId: string): Observable<Playlist> {
    const data = {
      token: this.token,
      playlistId,
      songId,
    };
    return this.http.post<Playlist>(`${API}/add-song`, data, httpOptions);
  }

  removeFromPlaylist(playlistId: string, songId: string): Observable<Playlist> {
    const data = {
      token: this.token,
      playlistId,
      songId,
    };
    return this.http.post<Playlist>(`${API}/remove-song`, data, httpOptions);
  }
}
