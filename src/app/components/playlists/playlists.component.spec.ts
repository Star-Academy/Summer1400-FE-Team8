import { LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Playlist } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

import { PlaylistsComponent } from './playlists.component';

@Component({ template: '' })
class mockedPlaylistService{
  getPlaylists(): Observable<Playlist[]> {
    return of([]);
  }
  createPlaylist(): Observable<Playlist> {
    return of();
  }
}

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let playlistService:mockedPlaylistService;
  let fixture: ComponentFixture<PlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: PlaylistService, useClass: mockedPlaylistService },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsComponent);
    playlistService = new mockedPlaylistService();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create playlist', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const event :any = new Event('submit');
    form.nativeElement.dispatchEvent(event);
    event.target[0].value = 'playlist1';
    fixture.detectChanges();
    expect(component.createPlaylist(event)).toBeTruthy();
  });
  it('should NOT create playlist', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const event :any = new Event('submit');
    form.nativeElement.dispatchEvent(event);
    event.target[0].value = '';
    fixture.detectChanges();
    expect(component.createPlaylist(event)).toBeFalsy();
  });
  it('should get all playlists', () => {
    spyOn(component, 'getAllPlaylists');
    component.ngAfterViewInit();
    expect(component.getAllPlaylists).toHaveBeenCalled();
  });
  it('should get all playlists', () => {
    expect(playlistService.getPlaylists()).toBeTruthy();
  });
  it('should change box style when create btn is clicked', fakeAsync(() => {
    const query = fixture.debugElement.query(By.css('.create-playlist-btn'));
    const createBox = fixture.debugElement.query(By.css('.create-playlist-page-box'));
    const btn : HTMLButtonElement = query.nativeElement;
    const event = new Event('click');
    btn.dispatchEvent(event);
    btn.click();
    tick(1);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(createBox.nativeElement.style.transform).toBe('scale(1)');
    });
  }));
  it('should close createPlaylistPage when click outside the box', () => {
    const createBox = fixture.debugElement.query(By.css('.create-playlist-page-box'));
    const query = fixture.debugElement.query(By.css('.create-playlist-page'));
    const createPage : HTMLButtonElement = query.nativeElement;
    const event = new Event('click');
    createPage.dispatchEvent(event);
    createPage.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(createBox.nativeElement.style.transform).toBe('scale(.1)');
    });
  });
  it('should NOT close createPlaylistPage when clicking inside the box', () => {
    const createBox = fixture.debugElement.query(By.css('.create-playlist-page-box'));
    const query = fixture.debugElement.query(By.css('.create-playlist-page-box'));
    const createPage : HTMLButtonElement = query.nativeElement;
    const event = new Event('click');
    createPage.dispatchEvent(event);
    createPage.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(createBox.nativeElement.style.transform).toBe('');
    });
  });

});
