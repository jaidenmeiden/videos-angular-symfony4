import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Mis videos';
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
