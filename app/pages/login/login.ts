import {Page, NavController, Loading, Alert, Storage, LocalStorage} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {Http} from '@angular/http';

@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  status: any;
  response: any;
  creds: any;
  storage: any;
  nim: any;
  nama: any;
  denda: any;
  qrcode: any;
  barcode: any;
  mahasiswastatus: any;
  token: any;

  constructor(private nav: NavController, private userData: UserData, private http: Http) {
    this.storage = new Storage(LocalStorage);
    this.status = "";
  }

  alertGagal() {
    let alert = Alert.create({
      title: '<div primary>Login Gagal</div>',
      subTitle: 'Tidah terhubung, cek koneksi kamu',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  salah() {
    let alert = Alert.create({
      title: '<div primary>Login Gagal</div>',
      subTitle: 'Username / Password kamu salah',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  loadingGagal() {
    let loading = Loading.create({
      content: "Please wait...",
      duration: 3000
    });

    loading.onDismiss(() => {
      this.alertGagal();
    });

    this.nav.present(loading);
  }

  presentLoading() {
    let loading = Loading.create({
      content: "Please wait...",
      duration: 4000
    });

    this.storage.get('nama').then((nama) => {
         this.nama = nama;
    });

    loading.onDismiss(() => {
        if (!this.status){
          this.alertGagal();
        }
        else if (this.nama && this.qrcode && this.barcode){
          this.submitted = true;
          this.userData.setNim(this.nim);
          this.userData.setStatus(1);
          this.nav.pop();
        }
        else {
          this.salah();
          this.response = '';
        }
    });

    this.nav.present(loading);

  }

  onLogin() {
    this.status = "";
    this.http.get("http://greentransport.ipb.ac.id/api/test")
        .subscribe(data => {
                this.status = data._body;
        })

    this.creds = JSON.stringify({username: this.login.username, password: this.login.password});

    this.http.post("http://greentransport.ipb.ac.id/api/login/mahasiswa", this.creds)
      .map(res => res.json())
        .subscribe(data => {
          this.nim = data[0]['mahasiswaNim'];
          this.nama = data[0]['mahasiswaNama'];
          this.mahasiswastatus = data[0]['mahasiswaStatus'];
          this.denda = data[0]['mahasiswaDenda'];
          this.barcode = data[0]['encode'];
          this.qrcode = data[0]['barcode'];
          this.token = data[0]['mahasiswaToken'];

          this.storage.set("nama", this.nama);
          this.storage.set("nim", this.nim);
          this.storage.set("mahasiswastatus", this.mahasiswastatus);
          this.storage.set("denda", this.denda);
          this.storage.set("qrcode", this.qrcode);
          this.storage.set("barcode", this.barcode);
          this.storage.set("token", this.token);
          this.storage.set("status", true);
          this.submitted = true;
          this.userData.login(this.login.username);
        });

    this.presentLoading();
  }

  cancel() {
    this.nav.pop();
  }
}
