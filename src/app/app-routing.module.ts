import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginSignupComponent} from './components/login-signup/login-signup.component';
import {LoginComponent} from './components/login-signup/login/login.component';
import {SignupComponent} from './components/login-signup/signup/signup.component';
import {PlayerComponent} from './components/player/player.component';
import {PlaylistsComponent} from './components/playlists/playlists.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {MusicSearchComponent} from './components/music-search/music-search.component';

const routes: Routes = [
  { path:'',component: HomepageComponent},
  { path:'user',component: LoginSignupComponent , children : [
      {path:'login',component: LoginComponent},
      {path:'signup',component: SignupComponent}
  ]},

  { path:'player',component: PlayerComponent},

  { path:'music_search',component: MusicSearchComponent},

  { path:'profile', children:[
    { path:'playlists',component: PlaylistsComponent},
    { path:'playlist',component: PlaylistComponent},
    { path:'edit_profile',component: EditProfileComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
