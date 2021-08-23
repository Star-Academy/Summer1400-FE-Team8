import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlService } from 'src/app/services/url/url.service';
import { SearchBoxComponent } from '../common/search-box/search-box.component';

import { MusicSearchComponent } from './music-search.component';


describe('MusicSearchComponent', () => {
  let component: MusicSearchComponent;
  let service : UrlService;
  let fixture: ComponentFixture<MusicSearchComponent>;



  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSearchComponent , SearchBoxComponent ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSearchComponent);
    component = fixture.componentInstance;
    spyOn(component, 'handleReload').and.returnValue();
    // spyOn(window.location, 'search');
    service = new UrlService();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create', () => {
    // const query = fixture.debugElement.query(By.css('button.search-pagination-forward'));
    // const btnElm: HTMLDivElement = query.nativeElement;
    // spyOn(service, 'setParams');
    // btnElm.click();
    // fixture.detectChanges();
    // fixture.whenStable().then(() => {
    //   expect(service.setParams).toHaveBeenCalled();
    // });
  });
});
