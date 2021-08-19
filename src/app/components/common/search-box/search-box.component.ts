import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UrlService } from 'src/app/services/url/url.service';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor(private urlService: UrlService) { }
  @ViewChild('searchInputRef') searchInputRef !: ElementRef;

  handleSearch(event:any) {
    event.preventDefault();
    const val = event.target[1].value;
    console.log(val)
    this.urlService.setParams('searched',val,'page','1');
  }

  getSearchInputElm(){
    return this.searchInputRef.nativeElement;
  }

  ngOnInit(): void {

  }

}
