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
  token: any;
  creds: any;

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

    this.storage.get('nama').then((nama) => {
         this.nama = nama;
    });

    this.storage.get('denda').then((denda) => {
         this.denda = denda;
    });

    this.storage.get('qrcode').then((qrcode) => {
         this.qrcode = qrcode;
    });

    this.storage.get('barcode').then((barcode) => {
         this.barcode = barcode;
    });

    this.storage.get('token').then((token) => {
         this.token = token;
    });

    this.storage.get('mahasiswastatus').then((mahasiswastatus) => {
         this.mahasiswastatus = mahasiswastatus;
    });

    this.http.get('http://greentransport.ipb.ac.id/api/sepeda')
      .map(res => res.json())
        .subscribe(data => {
          this.posts = data;
    });
  }

  doRefresh(refresher) {
    this.creds = JSON.stringify({nim: this.nim, token: this.token});
    this.http.post("http://greentransport.ipb.ac.id/api/mahasiswa", this.creds)
      .map(res => res.json())
        .subscribe(data => {
          this.mahasiswastatus = data[0]['mahasiswaStatus'];
          this.denda = data[0]['mahasiswaDenda'];

          this.storage.set("mahasiswastatus", this.mahasiswastatus);
          this.storage.set("denda", this.denda);
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
