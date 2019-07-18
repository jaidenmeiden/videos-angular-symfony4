import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Video} from '../models/video';
import {global} from './global';

/*
Configurar la clase.
Se utiliza el decorador @Injectable para poder injectar el servicio y no crear una instancia cada vez que se requiera
*/
@Injectable()
export class VideoService {

  public url: string;

  constructor(
    public _http: HttpClient /*Cuando se coloca un guión bajo en una propiedad de angular se determina que el final es un servicio*/
  ) {
    this.url = global.url;
  }

  createvideo(token, video):Observable<any> {
    let json = JSON.stringify(video);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'video/new', params, {headers:headers});
  }

  listvideo(token):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'video/list', params, {headers:headers});
  }

  getvideo(token, id):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'video/detail/'+id, params, {headers:headers});
  }

  update(token, video):Observable<any> {
    let json = JSON.stringify(video);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'video/edit/' + video.id, params, {headers:headers});
  }

  deletevideo(token, id):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.get(this.url + 'video/remove/'+id, params, {headers:headers});
  }

}
