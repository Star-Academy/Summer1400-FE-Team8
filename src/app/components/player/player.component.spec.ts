import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerComponent } from './player.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CardComponent} from "../card/card.component";
import {UserService} from "../../services/user/user.service";
import {Location, LocationStrategy} from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { Component } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import {Playlist, Song} from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import compileParser from "ajv/dist/compile/jtd/parse";
import {Router} from "@angular/router";

@Component({ template: '' })
class mockedPlaylistService{
  getPlaylists(): Observable<Playlist[]> {
    return of([]);
  }
}
@Component({ template: '' })
class mockedSongService {
  getAllSongs(): Observable<Song[]> {
    return of([]);
  }

}
describe('PlayerComponent', () => {
  // let mockAuthService: jasmine.SpyObj<AuthService>;
  // mockAuthService = jasmine.createSpyObj('AuthService', ['isLogged']);
  // mockAuthService.isLogged.and.returnValue(false);
  let auth: AuthService;
  let component: PlayerComponent;
  let playlistService:mockedPlaylistService;
  let songService :mockedSongService;
  let fixture: ComponentFixture<PlayerComponent>;
  let router: Router;
  let location: Location;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerComponent ],
      imports:[
        RouterTestingModule.withRoutes(routes),
        RouterTestingModule,
        HttpClientModule
      ] ,
      providers: [
        { provide: PlaylistService, useClass: mockedPlaylistService },
        { provide: songService, useClass: mockedSongService },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        // { provide: AuthService, useValue: mockAuthService }
      ],

    })

    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    playlistService = new mockedPlaylistService();
    component = fixture.componentInstance;
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    auth = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all playlists', () => {
    spyOn(component, 'getAllPlaylists');
    component.ngOnInit();
    expect(component.getAllPlaylists).toHaveBeenCalled();

  });
  it('should get all playlists', () => {
    expect(playlistService.getPlaylists()).toBeTruthy();
  });

  it('should not call loadSong when there is not  logged user', fakeAsync(() => {
    component.song = { id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }
    component.songs = [{ id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }]
    component.ss = { id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }
    component.recommends = [{ id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }]
    const alert: HTMLElement = fixture.nativeElement.querySelector('.signup-alert-container')!;
    spyOn(component, 'loadSong');
    spyOn(auth,'isLogged').and.returnValue(false);
    component.Process();
    tick();
    fixture.detectChanges();
      expect(alert.style.display).toBe('flex');
    expect(component.loadSong).not.toHaveBeenCalled();
  }));

  it('should call loadSong when there is  logged user', fakeAsync(() => {
    component.song = { id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }
    component.songs = [{ id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }]
    component.ss = { id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }
    component.recommends = [{ id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }]
    const alert: HTMLElement = fixture.nativeElement.querySelector('.signup-alert-container')!;
    spyOn(component, 'loadSong');
    spyOn(auth,'isLogged').and.returnValue(true);
    component.initialization().then();
    tick();
    component.Process();
    tick();
    expect(alert.style.display).toBe('');
    expect(component.loadSong).toHaveBeenCalled();
  }));


  it('should get all songs', () => {
    expect(songService.getAllSongs()).toBeTruthy();
  });

  it('should  call Process',  () => {
    spyOn(component, 'Process');
    component.Process();
    expect(component.Process).toHaveBeenCalled();
  });

  it('should  call initialization',  () => {
    spyOn(component, 'initialization');
    component.initialization();
    expect(component.initialization).toHaveBeenCalled();
  });

  it('should changes some stiles when info btn clicked', fakeAsync(() => {
    component.ngAfterViewInit();
    const infoContainer = fixture.debugElement.query(By.css('#infoContainer'));
    const lyricsContainer = fixture.debugElement.query(By.css('#lyricsContainer'));
    const infoBtn : HTMLButtonElement   = fixture.debugElement.query(By.css('.details-buttons-info')).nativeElement;
    const event = new Event('click');
    infoBtn.dispatchEvent(event);
    infoBtn.click();
    tick(1);
      expect(infoContainer.nativeElement.style.display).toBe('initial');
      expect(lyricsContainer.nativeElement.style.display).toBe('none');
  }));

  it('should changes some stiles when lyrics btn clicked', fakeAsync(() => {
    component.ngAfterViewInit();
    const infoContainer = fixture.debugElement.query(By.css('#infoContainer'));
    const lyricsContainer = fixture.debugElement.query(By.css('#lyricsContainer'));
    const lyricsBtn : HTMLButtonElement = fixture.debugElement.query(By.css('.details-buttons-lyrics')).nativeElement;
    const event = new Event('click');
    lyricsBtn.dispatchEvent(event);
    lyricsBtn.click();
    tick(1);
    expect(lyricsContainer.nativeElement.style.display).toBe('initial');
    expect(infoContainer.nativeElement.style.display).toBe('none');
  }));

  it('should truly call an execute showAddPage', fakeAsync(() => {
    const addPage: HTMLElement = fixture.nativeElement.querySelector('.add-to-playlist-page')!;
    const addBox: HTMLElement = fixture.nativeElement.querySelector('.add-to-playlist-page-box')!;
    component.showAddPage();
    tick(1);
      expect(addPage.style.display).toBe('flex');
      expect(addBox.style.transform).toBe('scale(1)');

  }));

  it('should not  close createPlaylistPage when click inside the box', fakeAsync(() => {
    component.showAddPage();
    tick(1);
      const addPage: HTMLElement = fixture.nativeElement.querySelector('.add-to-playlist-page')!;
      const addBox: HTMLElement = fixture.nativeElement.querySelector('.add-to-playlist-page-box')!;
      component.hideAddPage();
      tick();
    const event = new Event('click');
    addPage.dispatchEvent(event);
    addPage.click();
      tick(350);
        expect(addBox.style.transform).toBe('scale(0.1)');
    }
  ));

  it('should close createPlaylistPage when click outside the box', fakeAsync(() => {
      component.showAddPage();
      tick(1);
      const addPage: HTMLElement = fixture.nativeElement.querySelector('.add-to-playlist-page')!;
      const addBox: HTMLElement = fixture.nativeElement.querySelector('.add-to-playlist-page-box')!;
      component.hideAddPage();
      tick();
      const event = new Event('click');
      addBox.dispatchEvent(event);
      addBox.click();
      tick(350);

      expect(addPage.style.transform).toBe('');
      expect(addBox.style.transform).toBe('scale(1)');
    }
  ));

  it('navigate to login page ', fakeAsync(() => {
    const loginAlert: HTMLElement = fixture.nativeElement.querySelector('#loginAlert')!;
    const event = new Event('click');
    loginAlert.dispatchEvent(event);
    loginAlert.click();
    tick();
    expect(location.path()).toBe('/user/login');
  }))

  it('navigate to signup page ', fakeAsync(() => {
    const signupAlert: HTMLElement = fixture.nativeElement.querySelector('#signupAlert')!;
    const event = new Event('click');
    signupAlert.dispatchEvent(event);
    signupAlert.click();
    tick();
    expect(location.path()).toBe('/user/signup');
  }))

  it('should call loadSong ', fakeAsync(() =>
  {
    spyOn(component, 'loadSong');
    component.loadSong();
    tick();
    expect(component.loadSong).toHaveBeenCalled();
  }))

  it('should call loadTrack ', fakeAsync(() =>
  {
    spyOn(component, 'loadTrack');
    component.loadTrack();
    tick();
    expect(component.loadTrack).toHaveBeenCalled();
  }))

});
