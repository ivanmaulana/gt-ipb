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
  sepedaId: any;
  code: any;
  key: any;
  dn: any;

  data: any;

  constructor(private nav: NavController, private userData: UserData, private http: Http) {
    this.storage = new Storage(LocalStorage);
    this.status = "";

    this.data = this.userData.getData();
  }

  alertGagal() {
    let alert = Alert.create({
      title: '<div primary>Login Gagal</div>',
      subTitle: 'Tidah terhubung, cek koneksi kamu',
      buttons: ['OK']
    });
    this.nav.present(alert);
    this.storage.clear();
  }

  salah() {
    let alert = Alert.create({
      title: '<div primary>Login Gagal</div>',
      subTitle: 'Username / Password kamu salah',
      buttons: ['OK']
    });
    this.nav.present(alert);
    this.storage.clear();
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

    loading.onDismiss(() => {
        if (!this.status){
          this.alertGagal();
        }
        else if (this.nama && this.qrcode && this.token && this.key){
          this.submitted = true;
          this.userData.setKey(this.key);
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

    this.creds = JSON.stringify({username: this.login.username, password: this.login.password, data: this.data});

    this.http.post("http://greentransport.ipb.ac.id/api/loginMahasiswa2.php", this.creds)
      .map(res => res.json())
        .subscribe(data => {
          this.key = data['key'];
          this.nama = data['nama'];
          this.denda = data['denda'];
          this.qrcode = data['qrcode'];
          this.barcode = data['barcode'];
          this.token = data['token'];
          this.sepedaId = data['sepedaId'];
          this.dn = data['dn'];

          this.storage.set("key", this.key);
          this.storage.set("nama", this.nama);
          this.storage.set("qrcode", this.qrcode);
          this.storage.set("barcode", this.barcode);
          this.storage.set("denda", this.denda);
          this.storage.set("token", this.token);
          this.storage.set("sepedaId", this.sepedaId);
          this.storage.set("dn", this.dn);
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
