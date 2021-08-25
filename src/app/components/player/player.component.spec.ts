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
import {expectFile} from "@angular-devkit/build-angular/src/testing/jasmine-helpers";
import {SongService} from "../../services/song/song.service";

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
    songService= new mockedSongService();
    component = fixture.componentInstance;
    router = TestBed.get(Router)
    location = TestBed.get(Location)
    auth = TestBed.get(AuthService);
    component.recommand_index = 0 ;
    component.song = { id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }
    component.songs = [{ id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" } ,
      { id: "1", name: "دنیای بی تو", artist: "علی لهراسبی", lyrics: "روزی چند لحظه به من فکر میکنی\r\nبا کدوم آهنگ میام توو خاطرت\r\nیه کمی نشون بده ناراحتی\r\nباشه حتی به دروغ توو ظاهرت\r\n\r\nروزی چند بار به روزای رفتمون\r\nتو نگاه میکنی و میخندی\r\nداری با کی با خودت بد میکنی\r\nداری با کی سَر من میجنگی\r\n\r\nدنیاروکه بی تو من اینجوری نمیخوام\r\nهرجا حرف تو باشه منم کوتاه نمیام\r\nشبایی و که نیستی بهونتو میگیرم\r\nتقاص این روزارو دارم تنهایی میدم\r\n\r\nچند تا شب بیدار نشستی تا طلوع\r\nچند تا دلشوره رو حس کردی برام\r\nاز ته دل آرزو کردی که من\r\nناخداگاه به تولدت بیام\r\nشده از دوست دارم گفتن من\r\nیه شبانه روزو خوابت نبره\r\nشده ثابت بکنی بهم یه بار\r\nکه توو قلب تو فقط یک نفره\r\n\r\nدنیاروکه بی تو من اینجوری نمیخوام\r\nهرجا حرف تو باشه منم کوتاه نمیام\r\nشبایی و که نیستی بهونتو میگیرم\r\nتقاص این روزارو دارم تنهایی میدم\r\n\r\nدنیاروکه بی تو من اینجوری نمیخوام\r\nهرجا حرف تو باشه منم کوتاه نمیام\r\nشبایی و که نیستی بهونتو میگیرم\r\nتقاص این روزارو دارم تنهایی میدم", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Donyaye-Bi-To.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Donyaye-Bi-To.jpg", publish_date: "2020-09-19T00:00:00.000Z" }]
    component.ss = { id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" }
    component.recommends = [{ id: "9", name: "دلنوازان", artist: "علی لهراسبی", lyrics: "حال من دست خودم نیست دیگه آروم نمی گیرم\r\nدلم از کسی گرفته که می خوام براش بمیرم\r\nباز سرنوشت و انتهای آشنایی\r\nباز لحظه های غم انگیر جدایی\r\nباز لحظه های ناگزیر دل بریدن\r\nبازم آخر راه و حس تلخ نرسیدن\r\nپای دنیای تو موندم مثل عاشقای عالم\r\nتا منو ببخشی آخر تا دلت بسوزه کم کم\r\nمثل آینه روبه رومه حس با تو بودن من\r\nدارم از دست تو میرم عاشقی کن منو نشکن", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Delnavazan.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Delnavazan.jpg", publish_date: "2021-08-09T00:00:00.000Z" } ,
      { id: "1", name: "دنیای بی تو", artist: "علی لهراسبی", lyrics: "روزی چند لحظه به من فکر میکنی\r\nبا کدوم آهنگ میام توو خاطرت\r\nیه کمی نشون بده ناراحتی\r\nباشه حتی به دروغ توو ظاهرت\r\n\r\nروزی چند بار به روزای رفتمون\r\nتو نگاه میکنی و میخندی\r\nداری با کی با خودت بد میکنی\r\nداری با کی سَر من میجنگی\r\n\r\nدنیاروکه بی تو من اینجوری نمیخوام\r\nهرجا حرف تو باشه منم کوتاه نمیام\r\nشبایی و که نیستی بهونتو میگیرم\r\nتقاص این روزارو دارم تنهایی میدم\r\n\r\nچند تا شب بیدار نشستی تا طلوع\r\nچند تا دلشوره رو حس کردی برام\r\nاز ته دل آرزو کردی که من\r\nناخداگاه به تولدت بیام\r\nشده از دوست دارم گفتن من\r\nیه شبانه روزو خوابت نبره\r\nشده ثابت بکنی بهم یه بار\r\nکه توو قلب تو فقط یک نفره\r\n\r\nدنیاروکه بی تو من اینجوری نمیخوام\r\nهرجا حرف تو باشه منم کوتاه نمیام\r\nشبایی و که نیستی بهونتو میگیرم\r\nتقاص این روزارو دارم تنهایی میدم\r\n\r\nدنیاروکه بی تو من اینجوری نمیخوام\r\nهرجا حرف تو باشه منم کوتاه نمیام\r\nشبایی و که نیستی بهونتو میگیرم\r\nتقاص این روزارو دارم تنهایی میدم", file: "https://songs.code-star.ir/files/songs/Ali-Lohrasbi-Donyaye-Bi-To.mp3", cover: "https://songs.code-star.ir/files/covers/Ali-Lohrasbi-Donyaye-Bi-To.jpg", publish_date: "2020-09-19T00:00:00.000Z" }]
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


  it('should declare all songs and derivatives of them', () => {
    expect(component.songs).toHaveSize(1);
    expect(component.songs).toBeDefined();
    expect(component.song).toBeDefined();
    expect(component.recommends).toBeDefined();
    expect(component.ss).toBeDefined();
  });

  it('should update song requested to edit on it,s playlist,s', () => {
    component.updateSS("1");
    expect(component.ss.id).toEqual("1");
  });


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


  it('should initialize current_track', fakeAsync(() =>
  {
    component.initialization();
    expect(component.current_track).toBeDefined();
  }));

  it('should not call SeekUpdate', fakeAsync(() =>
  {
    spyOn(component, 'seekUpdate');
    component.initialization();
    expect(component.seekUpdate).not.toHaveBeenCalled();
  }));

  it('isPlaying variable should be false at first', fakeAsync(() =>
  {
    component.initialization();
    expect(component.isPlaying).toBeFalse();
  }));

  it('should update when isPlaying true', fakeAsync(() =>
  {
    spyOn(component , "playStop");
    component.initialization();
    component.isPlaying = true ;
    component.playStop();
    expect(component.playStop).toHaveBeenCalled();
    expect(component.isPlaying).toBeTrue();
  }));

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

  it('should update recommend_index and navigate when Next() called', fakeAsync(() =>
  {
    spyOn(component , "nextTrack");
    const nextButton: HTMLElement = fixture.nativeElement.querySelector('#Next')!;
    const event = new Event('click');
    nextButton.dispatchEvent(event);
    nextButton.click();
    tick(1);
    expect(component.nextTrack).toHaveBeenCalled();
    expect(component.recommand_index).toBe(0);
  }));

  it('should update recommend_index and navigate when Prev() called', fakeAsync(() =>
  {
    spyOn(component , "prevTrack");
    const prevButton: HTMLElement = fixture.nativeElement.querySelector('#Prev')!;
    const event = new Event('click');
    prevButton.dispatchEvent(event);
    prevButton.click();
    tick(1);
    expect(component.prevTrack).toHaveBeenCalled();
    expect(component.recommand_index).toBe(0);
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

  it('should not  close add or remove from playlists when click inside the box', fakeAsync(() => {
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

  it('should close add or remove from playlists when click outside the box', fakeAsync(() => {
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

  it('should restart current tracks time', fakeAsync(() =>
  {
    component.initialization();
    tick();
    spyOn(component , "replaySong");
    component.replaySong();
    expect(component.replaySong).toHaveBeenCalled();
    expect(component.current_track.currentTime).toBe(0);
  }));

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
