import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pageTitle: string;

  constructor(
    private _appComponent: AppComponent
  ) {
    this.pageTitle = 'Inicio';
  }

  ngOnInit() {
  }

}
