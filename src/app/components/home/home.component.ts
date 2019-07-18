import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {UserService} from '../../services/user.service';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public videos;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService
  ) {
    this.pageTitle = 'Mis videos';
  }

  ngOnInit() {
    this.loadUser();
    this.getVideos();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos() {
    this._videoService.listvideos(this.token).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.videos = response.videos;
        } else {
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.error(error);
      }
    );
  }
}
