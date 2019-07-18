import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

/*
Configurar la clase.
Se utiliza el decorador @Injectable para poder injectar el servicio y no crear una instancia cada vez que se requiera
*/
@Injectable()
export class UserService {

  public url: string;

  constructor(
    public _http: HttpClient /*Cuando se coloca un guión bajo en una propiedad de angular se determina que el final es un servicio*/
  ) {
    this.url = global.url;
  }

  prueba() {
    return 'Hola mundo';
  }

  register(user):Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + 'user/create', params, {headers:headers});
  }

  login(user):Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url + 'user/create', params, {headers:headers});
  }

}
