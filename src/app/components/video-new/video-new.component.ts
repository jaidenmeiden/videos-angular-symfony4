import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {VideoService} from '../../services/video.service';
import {Video} from '../../models/video';
import {User} from '../../models/user';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService]
})
export class VideoNewComponent implements OnInit {

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
    this.pageTitle = 'Guardar nuevo video favorito';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.video = new Video(1, this.identity.sub, '', '', '', 0, '', '');
  }

  onSubmit(form) {
    this._videoService.createvideo(this.token, this.video).subscribe(
      response => {
        if(response && response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['/inicio']);
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
