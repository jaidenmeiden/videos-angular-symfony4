import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {VideoService} from '../../services/video.service';
import {Video} from '../../models/video';
import {User} from '../../models/user';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService]
})
export class VideoDetailComponent implements OnInit {

  public video: Video;
  public identity;
  public token;
  public status: string;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getVideo();
  }

  getVideo() {
    this._route.params.subscribe(params => {
      var id = +params['id'];
      this._videoService.getvideo(this.token, id).subscribe(
        response => {
          if(response && response.status == 'success') {
            this.video = response.video;
          } else {
            this._router.navigate(['/inicio']);
          }
        }, error => {
          this.status = 'error';
          console.error(error);
        }
      );
    });
  }

}
