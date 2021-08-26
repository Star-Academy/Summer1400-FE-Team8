import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import {NavSideDesktopComponent} from './components/common/nav-side-desktop/nav-side-desktop.component'
import {NavSideMobileComponent} from './components/common/nav-side-mobile/nav-side-mobile.component'
import { FooterComponent } from './components/common/footer/footer.component';
import { SearchBoxComponent } from './components/common/search-box/search-box.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { LoginComponent } from './components/login-signup/login/login.component';
import { SignupComponent } from './components/login-signup/signup/signup.component';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { MusicSearchComponent } from './components/music-search/music-search.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {SearchItemComponent} from './components/music-search/search-item/search-item.component';
import { CardComponent } from './components/card/card.component';
import { PlaylistItemComponent } from './components/playlists/playlist-item/playlist-item.component';
import { PlaylistSongItemComponent } from './components/playlist/playlist-song-item/playlist-song-item.component';
import { NoCacheHeadersInterceptor } from './services/interceptor/interceptor.service';
import { PersianDataPipe } from './pipes/persian-data.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CardComponent,
    NavbarComponent,
    FooterComponent,
    SearchBoxComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    PlayerComponent,
    PlaylistComponent,
    PlaylistsComponent,
    MusicSearchComponent,
    EditProfileComponent,
    NavSideDesktopComponent,
    NavSideMobileComponent,
    SearchItemComponent,
    CardComponent,
    PlaylistItemComponent,
    PlaylistSongItemComponent,
    PersianDataPipe,
  ],
  exports: [CardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
