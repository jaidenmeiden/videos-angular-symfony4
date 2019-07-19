import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
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
  public status: string;
  public videos;
  public page;
  public prev_page;
  public next_page;
  public number_pages;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Mis videos';
  }

  ngOnInit() {
    this.loadUser();
    this.actualpageVideos();
  }

  actualpageVideos() {
    this._route.params.subscribe(params => {
      var page = +params['page'];

      if(!page) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getVideos(page);
    });
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page) {
    this._videoService.listvideos(this.token, page).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.videos = response.videos;

          var number_pages = [];
          for(var i = 1; i <= response.total_pages; i++) {
            number_pages.push(i);
          }
          this.number_pages = number_pages;

          if(page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }

          if(page < response.total_pages) {
            this.next_page = page + 1;
          } else {
            this.next_page = response.total_pages;
          }

          /*
          total_items_count: 10
          page_actual: 1
          items_per_page: 5
          total_pages: 2
          * */
        } else {
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.error(error);
      }
    );
  }

  getThumb(url, size = null) {
    var video, results, thumburl;

    if (url === null) {
      return '';
    }

    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    if(size != null) {
      thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
    }else{
      thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    }

    return thumburl;
  }

  deletevideo(id){
    this._videoService.deletevideo(this.token, id).subscribe(
      response => {
        if(response.status == 'success') {
          this.status = 'success';
          this.actualpageVideos();
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
