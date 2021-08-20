import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor(
    private urlService: UrlService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}
  @ViewChild('searchInputRef') searchInputRef!: ElementRef;

  handleSearch(event: any) {
    event.preventDefault();
    const val = event.target[1].value;
    if (this.actRoute.snapshot.routeConfig?.path !== 'music_search') {
      const queryParams = {
        page: '1',
        desc: 'true',
        sortBy: 'artist',
        searched: val,
      };
      this.router.navigate(['music_search'], {
        queryParams: queryParams,
      });
      return;
    }
    this.urlService.setParams('searched', val, 'page', '1');
  }

  getSearchInputElm() {
    return this.searchInputRef.nativeElement;
  }

  ngOnInit(): void {
  }
}
