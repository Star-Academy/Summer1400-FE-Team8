import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSongItemComponent } from './playlist-song-item.component';

describe('PlaylistSongItemComponent', () => {
  let component: PlaylistSongItemComponent;
  let fixture: ComponentFixture<PlaylistSongItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSongItemComponent ]
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
