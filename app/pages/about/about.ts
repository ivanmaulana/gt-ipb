import {Page, NavController, Storage, LocalStorage, Loading, Alert} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {TabsPage} from '../tabs/tabs';
import {TutorialPage} from '../tutorial/tutorial';
import {UserData} from '../../providers/user-data';
import {Http} from '@angular/http';

@Page({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  storage: any;
  status: any;
  pesan: any;
  creds: any;
  key: any;
  response: any;
  koneksi: any;
  versi: any;

  onPageWillEnter(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });

    this.storage.get('key').then((key) => {
         this.key = key;
    });
  }

  constructor(private nav: NavController, private user: UserData, private http: Http) {
    this.storage = new Storage(LocalStorage);

    this.versi = this.user.getVersi();
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

  alertGagal() {
    let alert = Alert.create({
      title: '<div primary>Kirim Pesan Gagal</div>',
      subTitle: 'Tidah terhubung, cek koneksi kamu',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  alertBerhasil() {
    let alert = Alert.create({
      title: '<div primary>Berhasil</div>',
      subTitle: 'Pesan kamu berhasil terkirim',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  loading() {
    let loading = Loading.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.onDismiss(() => {
      if (this.koneksi){
        this.alertBerhasil();
        this.pesan = "";
      }
      else {
        this.alertGagal();
      }

    });

    this.nav.present(loading);
  }

  kirim(){
    this.koneksi = "";
    this.http.get("http://greentransport.ipb.ac.id/api/test")
        .subscribe(data => {
                this.koneksi = data._body;
                this.koneksi = 1;
        })

    this.creds = JSON.stringify({pesan: this.pesan, key: this.key});
    this.http.post("http://greentransport.ipb.ac.id/api/pesan", this.creds)
        .subscribe(data => {
                this.response = data._body;
    });

    this.loading();
  }

  cekUpdate(){
    let loading = Loading.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.onDismiss(() => {
      if (this.versi != this.response){
        this.updateBaru();
        this.pesan = "";
      }
      else {
        this.updateGagal();
      }

    });

    this.nav.present(loading);
  }

  update(){
    this.koneksi = "";
    this.http.get("http://greentransport.ipb.ac.id/api/test")
        .subscribe(data => {
                this.koneksi = data._body;
                this.koneksi = 1;
        })

    this.http.get("http://greentransport.ipb.ac.id/api/update")
        .map(res => res.json())
          .subscribe(data => {
                this.response = data[0]['versi'];
          })

    this.cekUpdate();
  }

  updateBaru() {
    let alert = Alert.create({
      title: '<div primary>New Updates</div>',
      subTitle: `There's a new version. <a primary href="https://play.google.com/store/apps/details?id=com.ipb.green.campus&hl=en"> Click Here</a> to update.`,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  updateGagal() {
    let alert = Alert.create({
      title: '<div primary>No Updates</div>',
      subTitle: `There isn't any updates now.`,
      buttons: ['OK']
    });
    this.nav.present(alert);
  }
}
