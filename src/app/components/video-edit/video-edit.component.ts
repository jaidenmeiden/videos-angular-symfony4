import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {VideoService} from '../../services/video.service';
import {Video} from '../../models/video';
import {User} from '../../models/user';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css'],
  providers: [UserService, VideoService]
})
export class VideoEditComponent implements OnInit {

  public pageTitle: string;
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
    this.pageTitle = 'Modificar esté video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.video = new Video(1, this.identity.sub, '', '', '', 0, '', '');
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

  onSubmit(form) {
    this._videoService.update(this.token, this.video).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
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
