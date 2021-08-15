import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/interfaces';
import { SongService } from 'src/app/services/song/song.service';
import { Output } from '@angular/core';
import { UrlService } from 'src/app/services/url/url.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.scss']
})
export class MusicSearchComponent implements OnInit {
  private subs1 !: Subscription;
  private subs2 !: Subscription;
  private subs3 !: Subscription;
  
  
  songsInPage : number = 0;

  songs : Song[] = [];
  constructor(private songService : SongService , private urlService : UrlService
    ,private router : Router , private actRoute: ActivatedRoute) { }

  handlePagination(num:number,className:string,page:string){
    // -------------------- PAGINATION
    const pagesWrapper = document.querySelector('.search-pagination') as HTMLDivElement;
     if(className === 'link-all'){
       document.querySelectorAll('.link-search').forEach(i=>{
        //  i.style.display='none'
         i.classList.add('display-none')
       })
     }else{
       document.querySelectorAll('.link-all').forEach(i=>{
        i.classList.add('display-none')
       })
     }

    // ---- init pages buttons
    let pagesNum  = Math.round(num / Number(this.songsInPage));
         
    for(let i = 1; i <= pagesNum; i++){
      const link = document.createElement('A');
      link.classList.add('btn');
      link.classList.add('btn--gray');
      link.classList.add(className);
      link.innerHTML=i.toString();
      pagesWrapper.appendChild(link)
    }
  
   //  redirect to another page
   const links = document.querySelectorAll('.search-pagination a');
    links.forEach((link )=>{
     
     link.addEventListener('click', ()=>{
       let pageNum = (link as HTMLAnchorElement).innerText;
  
       this.urlService.setParams('page',pageNum,'','')
      
     })
   })
   
   // -------- change current page btn style
   links.forEach(link=>{
       let elm;
       if((link as HTMLAnchorElement).innerText===page){
        elm = link;
       }
         link.classList.remove('btn--blue');
         link.classList.add('btn--gray');
     if(elm){  
       const next1 = elm.nextElementSibling;
       const prev1 = elm.previousElementSibling;
       const next2 = next1 ? next1.nextElementSibling : null;
       const prev2 = prev1 ? prev1.previousElementSibling : null;
       const next3 = next2 ? next2.nextElementSibling : null;
       const prev3 = prev2 ? prev2.previousElementSibling:null;
       const next4 = next3 ? next3.nextElementSibling : null;
       const prev4 = prev3 ? prev3.previousElementSibling:null;
       const elms : any = {elm,next1,prev1,next2,prev2,next3,prev3,next4,prev4};
       
       links.forEach(link=>{
        //  console.log(link)
         link.classList.add('display-none')  
       })

       for(const prop in elms){
         if(elms[`${prop}`]){

           elms[`${prop}`].classList.remove('display-none');
         }
       }
       elm.classList.add('btn--blue')
       elm.classList.remove('btn--gray')
     }
   })
  
   // ----- backward and forward btns
   const backwardBtn = document.querySelector('.search-pagination-backward') as HTMLButtonElement;
   const forwardBtn = document.querySelector('.search-pagination-forward') as HTMLButtonElement;
   backwardBtn.addEventListener('click',()=>{
    this.urlService.setParams('page','1','','')
   })
   forwardBtn.addEventListener('click',()=>{
    this.urlService.setParams('page',pagesNum.toString(),'','')
   })
  
  }
  
  ngOnInit(): void {

    let data :any = [];
    const box = document.querySelector('.search-results-box');
    const descBtn = document.querySelector('.search-filter-mode .form-order input[id="desc"]') as HTMLInputElement;
    const ascBtn = document.querySelector('.search-filter-mode .form-order input[id="asc"]') as HTMLInputElement;
    const newestBtn = document.querySelector('.search-filter-mode .form-mode input[id="newest"]') as HTMLInputElement;
    const nameBtn = document.querySelector('.search-filter-mode .form-mode input[id="name"]') as HTMLInputElement;
    const artistBtn = document.querySelector('.search-filter-mode .form-mode input[id="artist"]') as HTMLInputElement;
    const searchBox = document.querySelector('main.search-container .search-container input[type="search"]') as HTMLInputElement;
    const template = document.querySelector('template[name="component-result-box"]') as HTMLTemplateElement;
    let page = window.location.search.split('&')[0].split('=')[1] as any;
    let descStr = window.location.search.split('&')[1].split('=')[1];
    let sortBy = window.location.search.split('&')[2].split('=')[1];
    let searchedContent = window.location.search.split('&')[3] ? window.location.search.split('&')[3].split('=')[1]:null;

    if(searchedContent){
      searchBox.value = decodeURI(searchedContent).replace(/\+/g, ' ')
    }

    let desc = (descStr === 'true');

    desc ? descBtn.checked = true : ascBtn.checked = true;
    sortBy === 'name' ? nameBtn.checked = true : sortBy==='artist'?artistBtn.checked = true : newestBtn.checked = true;

    let songsNum = 0;
    let songsInPage = 10;
    this.songsInPage = songsInPage;
     // ------------- CHANGE ITEMS ORDER
 
    // descending or ascending
    ascBtn.addEventListener('click',(event:any)=>{
      if(event.target.checked){
        this.urlService.setParams('desc','false','','')
      }
    })
    descBtn.addEventListener('click',(event:any)=>{
      if(event.target.checked){
        this.urlService.setParams('desc','true','','')
      }
    })

    // mode
    newestBtn.addEventListener('click',(event:any)=>{
      if(event.target.checked){
        this.urlService.setParams('sortBy','newest','','')
      }
    })
    nameBtn.addEventListener('click',(event:any)=>{
      if(event.target.checked){
        this.urlService.setParams('sortBy','name','','')
      }
    })
    artistBtn.addEventListener('click',(event:any)=>{
      if(event.target.checked){
        this.urlService.setParams('sortBy','artist','','')
      }
    })


    /* ------------- REPRESENT ALL THE SONGS ------------- */
    if(!searchedContent){

      this.subs1 = this.songService.getAllSongs()
        .subscribe(
          (res : any)=>{
            const songs : Song[] = res.songs;
            songsNum = songs.length;
            this.handlePagination(songsNum,'link-all',page);
          }
        )

        this.subs2 = this.songService.postSongsPage(songsInPage, page, sortBy, desc)
        .subscribe(
          (res : any)=>{
           this.songs = res.songs;
          
          }
        )
      }
  
      /* ------------- REPRESENT SONGS RELATED TO SEARCHED CONTENT ------------- */
      if(searchedContent){
        let searched = decodeURI(searchedContent as string)
        this.subs3 = this.songService.postSongsFind(searched, 100, sortBy, desc)
        .subscribe(
          (res:any)=>{
            const divider = (page:any)=>{
              let start = 0;
              let end = 9;
              start += (parseInt(page)-1)*10;
              end += parseInt(page)*10;
              return{
                start,end
              }
            }
            let start = divider(this.urlService.getParams('page')).start;
            let end = divider(this.urlService.getParams('page')).end;
            
            divider(this.urlService.getParams(page))

            this.songs = res.songs.slice(start,end);
            this.handlePagination(res.songs.length,'link-search',page);
          }
        )
      }

  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
    this.subs3.unsubscribe();
  }

}
