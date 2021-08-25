import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, fakeAsync, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { Song } from 'src/app/interfaces/interfaces';
import { SongService } from 'src/app/services/song/song.service';
import { UrlService } from 'src/app/services/url/url.service';
import { SearchBoxComponent } from '../common/search-box/search-box.component';

import { MusicSearchComponent } from './music-search.component';

class mockedUrlService {
  setParams() {}
  getParams() {}
}

describe('MusicSearchComponent', () => {
  let component: MusicSearchComponent;
  let fixture: ComponentFixture<MusicSearchComponent>;
  let router: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicSearchComponent, SearchBoxComponent],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: UrlService, useClass: mockedUrlService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSearchComponent);
    component = fixture.componentInstance;
    spyOn(component, 'handleReload').and.returnValue();
    router = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', inject([SongService], (songService: SongService) => {
    const songs: Song[] = [
      {
        id: '1',
        name: 'name1',
        artist: 'artist1',
      },
    ];
    spyOn(songService, 'getAllSongs').and.callFake(() => {
      const res = { songs: songs };
      return of(res as any);
    });
    spyOn(songService, 'postSongsPage').and.callFake(() => {
      return of(songs);
    });
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(songService.getAllSongs).toHaveBeenCalled();
    expect(songService.postSongsPage).toHaveBeenCalled();
  }));
  it('should create', inject([SongService], (songService: SongService) => {
    const songs: Song[] = [
      {
        id: '1',
        name: 'name1',
        artist: 'artist1',
      },
    ];
    spyOn(songService, 'postSongsFind').and.callFake(() => {
      const res = { songs: songs };
      return of(res as any);
    });
    router.snapshot.queryParams.searched = 'www';
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(songService.postSongsFind).toHaveBeenCalled();
  }));
  it('should create', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('.search-pagination-container button')).nativeElement;
    spyOn(component, 'handleBackForwardBtns').and.callThrough();
    button.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.handleBackForwardBtns).toHaveBeenCalled();
    });
  }));
  it('should create', fakeAsync(() => {
    const input = fixture.debugElement.query(By.css('.form-order input[id="desc"]')).nativeElement;
    spyOn(component, 'handleChangeFilter').and.callThrough();
    input.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.handleChangeFilter).toHaveBeenCalled();
    });
  }));
  it('should create', () => {
    component.handlePagination(100, 'link-all', '1');
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('.link-all')).nativeElement;
    expect(link.classList).not.toContain('display-none');
  });
});
