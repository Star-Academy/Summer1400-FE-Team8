import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { LocationStrategy } from '@angular/common';
import { PlaylistItemComponent } from './playlist-item.component';
import { By } from '@angular/platform-browser';
import { routes } from 'src/app/app-routing.module';

describe('PlaylistItemComponent', () => {
  let component: PlaylistItemComponent;
  let fixture: ComponentFixture<PlaylistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistItemComponent],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      providers: [{ provide: LocationStrategy, useClass: MockLocationStrategy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistItemComponent);
    component = fixture.componentInstance;
    component.playlist = {
      id: '1',
      name: 'name1',
      songs: [
        {
          id: '1',
          name: 'akbar',
          artist: 'akbar',
          cover: 'cover',
          lyrics: 'lyrics',
          file: 'file',
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show playlist songs', fakeAsync(() => {
    spyOn(component, 'showPlaylistSongs').and.callThrough();
    const div = fixture.debugElement.query(By.css('.playlists-item')).nativeElement;
    div.click();
    fixture.whenStable().then(() => {
      expect(component.showPlaylistSongs).toHaveBeenCalled();
    });
  }));
  it('should remove song from playlist', fakeAsync(() => {
    spyOn(component, 'removePlaylist').and.callThrough();
    const deleteBtn = fixture.debugElement.query(By.css('.playlists-item-delete img')).nativeElement;
    deleteBtn.click();
    fixture.whenStable().then(() => {
      expect(component.removePlaylist).toHaveBeenCalled();
    });
  }));
});
