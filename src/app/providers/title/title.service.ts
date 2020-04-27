import { Injectable } from '@angular/core';
import {Constant} from '../../models/constant/constant';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this.titleService.setTitle(value);
    this._title = value;
  }
  private _title: string;

  constructor(private readonly titleService: Title) {
    this.title = Constant.BROWSER_TAB_TITLE;
  }
}
