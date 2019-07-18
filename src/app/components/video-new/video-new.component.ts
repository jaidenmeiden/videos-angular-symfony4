import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Video} from '../../models/video';
import {User} from '../../models/user';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService]
})
export class VideoNewComponent implements OnInit {

  public pageTitle: string;
  public video: Video;
  public identity;
  public token;
  public status: string;

  constructor(
    private _userService: UserService,
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
    console.log(this.video);
  }

}
