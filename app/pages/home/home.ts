import {ViewChild, Component} from '@angular/core';
import {IonicApp, Page, Modal, Alert, NavController, ItemSliding, List, Storage, LocalStorage, Platform, ViewController} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {Http} from '@angular/http';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {TutorialPage} from '../tutorial/tutorial';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  nim: any;
  posts: any;
  test: any;
  status: number;
  storage: any;
  nama: any;
  denda: any;
  mahasiswastatus: any;
  code: boolean = true;
  qrcode: any;
  barcode: any;

  onPageWillEnter(){
    this.do();

    this.code = true;
  }

  constructor(
    private app: IonicApp,
    private nav: NavController,
    private user: UserData,
    private http: Http
  ) {
    this.storage = new Storage(LocalStorage);

  }

  change(){
    this.user.setCode(!this.code);
    this.code = !this.code;
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

  do(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });

    this.storage.get('nim').then((nim) => {
         this.nim = nim;
    });

    this.storage.get('nama').then((nim) => {
         this.nama = nim;
    });

    this.storage.get('denda').then((nim) => {
         this.denda = nim;
    });

    this.storage.get('qrcode').then((nim) => {
         this.qrcode = nim;
    });

    this.storage.get('barcode').then((nim) => {
         this.barcode = nim;
    });

    this.storage.get('mahasiswastatus').then((nim) => {
         this.mahasiswastatus = nim;
    });

    this.http.get('http://devagrstudio.com/SepedaKampus/get_data_sepeda.php')
      .map(res => res.json())
        .subscribe(data => {
          this.posts = data;
    });
  }

  doRefresh(refresher) {

    this.http.get('http://greentransport.ipb.ac.id/api/get_data_mahasiswa.php?nim='+this.nim)
      .map(res => res.json())
        .subscribe(data => {
          this.storage.set("nama", data[0]['mahasiswaNama']);
          this.storage.set("mahasiswastatus", data[0]['mahasiswaStatus']);
          this.storage.set("denda", data[0]['mahasiswaDenda']);
          this.storage.set("qrcode", data[0]['encode']);
          this.storage.set("barcode", data[0]['barcode']);
          this.storage.set("status", true);
          this.denda = data[0]['mahasiswaDeda'];
          this.mahasiswastatus = data[0]['mahasiswaStatus'];
    });

    this.do();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  openModal() {
    let modal = Modal.create(ModalsContentPage);
    this.nav.present(modal);
}
}

@Component({
  templateUrl: './build/pages/home/modal-content.html'
})
class ModalsContentPage {

  constructor(public platform: Platform,public viewCtrl: ViewController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
