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
  nim: any;
  response: any;
  koneksi: any;

  onPageWillEnter(){
    this.storage.get('hasLoggedIn').then((status) => {
         this.status = status;
    });

    this.storage.get('nim').then((nim) => {
         this.nim = nim;
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
        this.creds = JSON.stringify({pesan: this.pesan, nim: this.nim});
        this.http.post("http://greentransport.ipb.ac.id/api/pesan.php", this.creds)
            .subscribe(data => {
                    this.response = data._body;
        });
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
    this.http.get("http://greentransport.ipb.ac.id/api/test.php")
        .subscribe(data => {
                this.koneksi = data._body;
        })

    this.loading();
  }
}
