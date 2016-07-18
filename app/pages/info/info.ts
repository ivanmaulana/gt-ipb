import {Component} from '@angular/core';
import {NavController, Page, ActionSheet, Modal, Alert, Storage, LocalStorage, ViewController, Platform, NavParams} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {TutorialPage} from '../tutorial/tutorial';
import {JadwalPage} from '../jadwal/jadwal';
import {UserData} from '../../providers/user-data';
// import {InfoData} from './info-data';

@Page({
  templateUrl: 'build/pages/info/info.html'
})
export class InfoPage {
  storage: any;
  nama: any;
  status: any;
  koridor1: any;

  onPageWillEnter(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });
  }

  constructor(private nav: NavController, private user: UserData) {
    this.storage = new Storage(LocalStorage);
  }

  login(){
    this.nav.push(LoginPage);
  }

  logout(){
    setTimeout(() => {
      this.user.logout();
      this.nav.push(TabsPage);
    }, 1000);
  }

  logoutIos(){
    setTimeout(() => {
      this.user.logout();
      this.nav.push(TutorialPage);
    }, 1000);
  }

  tutorial(){
    this.nav.push(TutorialPage);
  }

  openModal(maps) {
    let modal = Modal.create(ModalsContentPage, maps);
    this.nav.present(modal);
  }

  jadwal(){
    this.nav.push(JadwalPage);
  }
}

@Component({
  templateUrl: './build/pages/info/modal-content.html'
})
class ModalsContentPage {
  maps;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    var maps= [
      {
        name: 'Koridor 1',
        detail: 'GWW <-> BERLIN <-> MIPA <-> ASTRI <-> TANOTO <-> MENWA <-> FAHUTAN <-> ASRAMA INTER <-> ALHURR <-> GOR <-> FPIK <-> FKH',
        image: 1
      },
      {
        name: 'Koridor 2',
        detail: 'GWW <-> BERLIN <-> MIPA <-> ASTRI <-> TANOTO <-> MENWA <-> FAHUTAN <-> ASRAMA INTER <-> ALHURR <-> GOR <-> FPIK <-> FKH',
        image: 2
      },
      {
        name: 'Koridor 3',
        detail: 'GWW <-> FEM <-> LSI <-> TECHNO <-> ALHURR <-> GOR <-> FPIK <-> FKH',
        image: 3
      },
      {
        name: 'Koridor 4',
        detail: 'GWW <-> KKI/PASCA <-> REKTORAT <-> PARKIR GTV <-> LAB <-> FKH',
        image: 4
      },
    ];
    this.maps = maps[this.params.get('maps')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
