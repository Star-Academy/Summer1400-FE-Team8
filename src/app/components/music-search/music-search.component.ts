import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Song } from 'src/app/interfaces/interfaces';
import { SongService } from 'src/app/services/song/song.service';
import { UrlService } from 'src/app/services/url/url.service';
import { Subscription } from 'rxjs';
import { SearchBoxComponent } from '../common/search-box/search-box.component';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.scss'],
})
export class MusicSearchComponent implements OnInit {
  constructor(
    private songService: SongService,
    private urlService: UrlService
  ) {}

  @ViewChild('boxRef') boxRef!: ElementRef;
  @ViewChild('paginationRef') paginationRef!: ElementRef;
  @ViewChild('pagBackwardBtnRef') pagBackwardBtnRef!: ElementRef;
  @ViewChild('pagForwardBtnRef') pagForwardBtnRef!: ElementRef;
  @ViewChild('descRef') descRef!: ElementRef;
  @ViewChild('ascRef') ascRef!: ElementRef;
  @ViewChild('newestRef') newestRef!: ElementRef;
  @ViewChild('nameRef') nameRef!: ElementRef;
  @ViewChild('artistRef') artistRef!: ElementRef;
  @ViewChild(SearchBoxComponent) searchBoxRef!: SearchBoxComponent;
  private subs1!: Subscription;
  private subs2!: Subscription;
  private subs3!: Subscription;
  songsInPage: number = 0;
  songs: Song[] = [];
  pagesNum: string = '';

  handleBackForwardBtns(pageNum: string) {
    this.urlService.setParams('page', pageNum, '', '');
  }

  handlePagination(num: number, className: string, page: string) {
    const pagesWrapper = this.paginationRef.nativeElement;
    if (className === 'link-all') {
      pagesWrapper.querySelectorAll('.link-search').forEach((i: any) => {
        i.classList.add('display-none');
      });
    } else {
      pagesWrapper.querySelectorAll('.link-all').forEach((i: any) => {
        i.classList.add('display-none');
      });
    }

    let pagesNum = Math.round(num / Number(this.songsInPage));

    for (let i = 1; i <= pagesNum; i++) {
      const link = document.createElement('A');
      link.classList.add('btn');
      link.classList.add('btn--gray');
      link.classList.add(className);
      link.innerHTML = i.toString();
      pagesWrapper.appendChild(link);
    }

    const links = pagesWrapper.querySelectorAll('.search-pagination a');
    links.forEach((link: any) => {
      link.addEventListener('click', () => {
        let pageNum = (link as HTMLAnchorElement).innerText;
        this.urlService.setParams('page', pageNum, '', '');
      });
    });

    links.forEach((link: any) => {
      let elm;
      if ((link as HTMLAnchorElement).innerText === page) {
        elm = link;
      }
      link.classList.remove('btn--blue');
      link.classList.add('btn--gray');
      if (elm) {
        const next1 = elm.nextElementSibling;
        const prev1 = elm.previousElementSibling;
        const next2 = next1 ? next1.nextElementSibling : null;
        const prev2 = prev1 ? prev1.previousElementSibling : null;
        const next3 = next2 ? next2.nextElementSibling : null;
        const prev3 = prev2 ? prev2.previousElementSibling : null;
        const next4 = next3 ? next3.nextElementSibling : null;
        const prev4 = prev3 ? prev3.previousElementSibling : null;
        const elms: any = {
          elm,
          next1,
          prev1,
          next2,
          prev2,
          next3,
          prev3,
          next4,
          prev4,
        };

        links.forEach((link: any) => {
          link.classList.add('display-none');
        });
        for (const prop in elms) {
          if (elms[`${prop}`]) {
            elms[`${prop}`].classList.remove('display-none');
          }
        }
        elm.classList.add('btn--blue');
        elm.classList.remove('btn--gray');
      }
    });

    this.pagesNum = pagesNum.toString();
  }

  handleChangeFilter(e: any, paramName: string, paramVal: string) {
    if (e.target.checked) {
      this.urlService.setParams(paramName, paramVal, '', '');
    }
  }
  ngOnInit(): void {
    if (!window.location.search) {
      window.location.replace('/music_search?page=1&desc=false&sortBy=artist');
    }
  }
  ngAfterViewInit(): void {
    const descBtn = this.descRef.nativeElement;
    const ascBtn =this.ascRef.nativeElement;
    const newestBtn = this.newestRef.nativeElement;
    const nameBtn = this.nameRef.nativeElement;
    const artistBtn = this.artistRef.nativeElement;
    const searchBox = this.searchBoxRef.getSearchInputElm();
    let page = window.location.search.split('&')[0].split('=')[1] as any;
    let descStr = window.location.search.split('&')[1].split('=')[1];
    let sortBy = window.location.search.split('&')[2].split('=')[1];
    let searchedContent = window.location.search.split('&')[3]
      ? window.location.search.split('&')[3].split('=')[1]
      : null;

    if (searchedContent) {
      searchBox.value = decodeURI(searchedContent).replace(/\+/g, ' ');
    }

    let desc = descStr === 'true';

    desc ? (descBtn.checked = true) : (ascBtn.checked = true);
    sortBy === 'name'
      ? (nameBtn.checked = true)
      : sortBy === 'artist'
      ? (artistBtn.checked = true)
      : (newestBtn.checked = true);

    let songsNum = 0;
    let songsInPage = 10;
    this.songsInPage = songsInPage;

    if (!searchedContent) {
      this.subs1 = this.songService.getAllSongs().subscribe((res: any) => {
        const songs: Song[] = res.songs;
        songsNum = songs.length;
        this.handlePagination(songsNum, 'link-all', page);
      });

      this.subs2 = this.songService
        .postSongsPage(songsInPage, page, sortBy, desc)
        .subscribe((res: any) => {
          this.songs = res.songs;
        });
    }

    if (searchedContent) {
      let searched = decodeURI(searchedContent as string);
      this.subs3 = this.songService
        .postSongsFind(searched, 100, sortBy, desc)
        .subscribe((res: any) => {
          const divider = (page: any) => {
            let start = 0;
            let end = 9;
            start += (parseInt(page) - 1) * 10;
            end += parseInt(page) * 10;
            return {
              start,
              end,
            };
          };
          let start = divider(this.urlService.getParams('page')).start;
          let end = divider(this.urlService.getParams('page')).end;

          divider(this.urlService.getParams(page));

          this.songs = res.songs.slice(start, end);
          this.handlePagination(res.songs.length, 'link-search', page);
        });
    }
  }
  ngOnDestroy() {
    if (!window.location.search) {
      return;
    }
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
    this.subs3.unsubscribe();
  }
}
