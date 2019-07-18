import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public identity: User;
  public token: string;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Login';
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        if(!response.status || response.status != 'error') {
          this.status = 'success';
          this.identity = response;

          this._userService.signup(this.user, true).subscribe(
            response => {
              if(!response.status || response.status != 'error') {
                this.token = response;

                console.log(this.identity);
                console.log(this.token);
              } else {
                this.status = 'error';
              }
            }, error => {
              this.status = 'error';
              console.error(error);
            }
          );
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
