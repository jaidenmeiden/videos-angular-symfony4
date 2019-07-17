import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Registro';
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '', '', '');
  }

  ngOnInit() {
    console.log(this.user);
    console.log(this._userService.prueba());
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 'success') {
          this.status = 'success';
          form.reset();
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
