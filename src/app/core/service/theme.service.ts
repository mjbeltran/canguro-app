import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  // private _theme: Subject<boolean> = new Subject<boolean>();
  // isDarkTheme = this._theme.asObservable();
  private _theme: BehaviorSubject<String> = new BehaviorSubject<String>("primary");
  currentTheme = this._theme.asObservable();

  constructor() {
  }

  setTheme(theme: String) {
    this._theme.next(theme);
  }
}