import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  storage: any;
  nim: any;
  status: number;
  code: boolean;
  versi: any;

  constructor(private events: Events) {
    this.storage = new Storage(LocalStorage);
    this.nim = "";
    this.status = 0;
    this.versi = '1.0.2';
  }

  setCode(code){
    this.code = code;
    this.storage.set("code", this.code);
  }

  getCode(code){
    return this.code;
  }

  setStatus(status){
    this.status = status;
  }

  getStatus(){
    return this.status;
  }

  setNim(nim){
    this.nim = nim;
    this.storage.set("nim", this.nim);
  }

  getNim(){
    return this.nim;
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');

    this.nim = "";
    this.status = 0;
    this.storage.remove("nim");
    this.storage.remove("nama");
    this.storage.remove("mahasiswastatus");
    this.storage.remove("denda");
    this.storage.remove("status");
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  getVersi(){
    return this.versi;
  }
}
