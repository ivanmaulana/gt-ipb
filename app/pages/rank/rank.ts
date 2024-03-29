import {Component} from '@angular/core';
import {IonicApp, Page, Modal, Alert, NavController, ItemSliding, List, Storage, LocalStorage, ViewController, Platform,} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {Http} from '@angular/http';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {TutorialPage} from '../tutorial/tutorial';

@Page({
  templateUrl: 'build/pages/rank/rank.html',
})

export class RankPage {
  storage: any;
  nama: any;
  status: any;
  rankings: any;
  contoh: any;
  ranks: string[] = ['gold', 'primary', 'instagram', 'twitter', 'silver', 'bronze'];
  pinjaman: any;
  recents: any;

  onPageWillEnter(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });

    this.refresh();
  }

  constructor(private nav: NavController, private user: UserData, private http: Http) {
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

    refresh(){
      this.http.get('http://greentransport.ipb.ac.id/api/rank')
        .map(res => res.json())
          .subscribe(data => {
            this.rankings = data;
      });

      this.http.get('http://greentransport.ipb.ac.id/api/pinjaman')
          .subscribe(data => {
            this.pinjaman = data._body;
      });

      this.http.get('http://greentransport.ipb.ac.id/api/recent')
        .map(res => res.json())
          .subscribe(data => {
            this.recents= data;
      });
    }

    doRefresh(refresher) {
      this.refresh();

      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }

    openModal(){
      let modal = Modal.create(ModalsContentPage);
      this.nav.present(modal);
    }
}

@Component({
  templateUrl: './build/pages/rank/modal-content.html'
})
export class ModalsContentPage{
  response;

  onPageWillEnter(){
    this.refresh();
  }

  constructor(private platform: Platform, private viewCtrl: ViewController, private http: Http){
    this.refresh();
  }

  refresh(){
    this.http.get('http://greentransport.ipb.ac.id/api/belumPengembalian')
      .map(res => res.json())
        .subscribe(data => {
          this.response= data;
    });
  }

  doRefresh1(refresher) {
    this.refresh();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
