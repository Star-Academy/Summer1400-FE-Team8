import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { PlaylistSongItemComponent } from './playlist-song-item.component';
import { Location, LocationStrategy } from '@angular/common';
import { routes } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';
import { MockLocationStrategy } from '@angular/common/testing';
import { Observable, of } from 'rxjs';
import { Playlist } from 'src/app/interfaces/interfaces';

describe('PlaylistSongItemComponent', () => {
  let component: PlaylistSongItemComponent;
  let fixture: ComponentFixture<PlaylistSongItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistSongItemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: PlaylistService, useClass: PlaylistServiceStub },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongItemComponent);
    component = fixture.componentInstance;
    component.song = {
      id: '1',
      name: 'aaa',
      artist: 'aaaaa',
    };
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false and not navigate to player page', () => {
    const div = fixture.debugElement.query(By.css('.favorites-box-item-delete'));
    const event = new Event('click');
    div.nativeElement.dispatchEvent(event);
    expect(component.handlePlay(event, '1')).toBeFalsy();
  });
  it('should remove song from playlist', () => {
    const div = fixture.debugElement.query(By.css('.favorites-box-item-delete'));
    const event = new Event('click');
    div.nativeElement.dispatchEvent(event);
    expect(component.removeSongFromPlaylist(event, '1')).toBeTruthy();
  });
  it('should remove song from playlist', () => {
    // expect().toBeTruthy();
  });

  // it('should ', () => {
  //   const location = TestBed.get(Location);
  //   expect(location.path()).toBe('');
  // });

  it('should navigate to player component', fakeAsync(() => {
    const location = TestBed.get(Location);

    const linkDes = fixture.debugElement.query(By.css('div.favorites-box-item'));
    const divElm: HTMLDivElement = linkDes.nativeElement;
    divElm.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/player/1');
    });
  }));
});

@Component({ template: '' })
class DummyComponent {}

class PlaylistServiceStub {
  removeFromPlaylist(): Observable<Playlist> {
    return of();
  }
}
