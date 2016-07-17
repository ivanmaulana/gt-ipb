import {ViewChild} from '@angular/core';
import {IonicApp, Page, Modal, Alert, NavController, ItemSliding, List, Storage, LocalStorage} from 'ionic-angular';
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
  posts: any;
  contoh: any;
  ranks: string[] = ['gold', 'primary', 'instagram', 'twitter', 'silver', 'bronze'];

  onPageWillEnter(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });

    this.http.get('http://greentransport.ipb.ac.id/api/get_rank.php')
      .map(res => res.json())
        .subscribe(data => {
          this.posts = data;
          // this.rank[0] = data[0].mahasiswaNama;
    });
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

    doRefresh(refresher) {

      this.http.get('http://devagrstudio.com/SepedaKampus/get_rank.php')
        .map(res => res.json())
          .subscribe(data => {
            this.posts = data;
            this.contoh = data[0].mahasiswaNama;
      });

      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }

}
