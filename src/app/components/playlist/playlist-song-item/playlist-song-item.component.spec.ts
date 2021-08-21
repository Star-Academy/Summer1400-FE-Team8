import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlaylistService } from 'src/app/services/playlist/playlist.service';
import { PlaylistSongItemComponent } from './playlist-song-item.component';

describe('PlaylistSongItemComponent', () => {
  let component: PlaylistSongItemComponent;
  let fixture: ComponentFixture<PlaylistSongItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSongItemComponent ],
      imports : [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        {provide:PlaylistService,useClass:PlaylistServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSongItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class PlaylistServiceStub{

}