import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';

import { PlaylistsComponent } from './playlists.component';

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsComponent);
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
    const http :any = ''
    const http2 :any = ''
    const service = new PlaylistService(http,http2)
    const service2 = new AuthService();
    spyOn(service2, 'getToken')
    .and.returnValue('abcd')
    spyOn(service, 'getPlaylists')
    .and.returnValue(of([]))
    fixture.detectChanges();
    expect(service.getPlaylists).toHaveBeenCalled();
  });
 
});
